import Anthropic from '@anthropic-ai/sdk';
import type { CvContent } from './extract';
import type { CvReviewAiDraft } from '@/types';

// Default to Opus 5.5 (best quality for a paid deliverable). Override with
// CV_REVIEW_MODEL (e.g. "claude-sonnet-5-5") to trade some quality for cost.
const MODEL = process.env.CV_REVIEW_MODEL || 'claude-opus-5-5';

const SYSTEM = `You are a senior UK software-testing and QA hiring manager reviewing CVs on behalf of Inside STLC, a professional QA consultancy and academy. You have hired and coached testers for over two decades.

Your job is to review a candidate's CV and give honest, specific, constructive feedback that would genuinely improve their chances of landing QA / software-testing roles in the UK market. Be encouraging but candid — flag real weaknesses, never flatter.

Judge the CV against what UK QA hiring managers and ATS systems actually look for: a clear professional summary; relevant, measurable achievements (not just duties); concrete tools and methodologies (e.g. test management, automation frameworks, CI/CD, API testing, Agile); evidence of impact; clean structure, consistent tense, and no spelling/grammar errors; appropriate length; and ATS-friendly formatting.

Use British English spelling throughout. Be specific to THIS candidate — reference their actual experience, never generic filler.`;

function instruction(amend: boolean): string {
  return `Review the CV above and respond with ONLY a single valid JSON object — no prose, no markdown code fences, nothing before or after it. Use exactly these keys:

{
  "score": <integer 0-100: overall CV strength for the UK QA job market>,
  "good": "<markdown bullet list of the genuine strengths of this CV, specific to its content>",
  "improve": "<markdown bullet list of the most important, actionable improvements — ordered by impact, each explaining what to change and why>",
  "summary": "<2-4 sentence plain-English overall verdict and the single highest-priority change>",
  "amendedCv": ${amend
    ? '"<a fully rewritten, improved version of the CV in clean markdown — keep it truthful to the candidate\'s real experience, strengthen the wording, quantify achievements where plausible, fix structure and tense, and make it ATS-friendly>"'
    : '"<a short markdown preview showing how you would rewrite the professional summary and 2-3 example bullet points, to demonstrate the kind of improvement a full rewrite would deliver>"'}
}

Do not invent qualifications, employers, or dates the candidate does not have. Keep everything truthful. Return valid JSON only.`;
}

function parseDraft(text: string): Omit<CvReviewAiDraft, 'model' | 'generatedAt'> {
  let t = text.trim();
  // Strip accidental code fences.
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  // Fall back to the outermost braces if there is stray text around the JSON.
  if (!t.startsWith('{')) {
    const first = t.indexOf('{');
    const last = t.lastIndexOf('}');
    if (first !== -1 && last !== -1) t = t.slice(first, last + 1);
  }
  const obj = JSON.parse(t);
  const score = Math.max(0, Math.min(100, Math.round(Number(obj.score) || 0)));
  return {
    score,
    good: String(obj.good ?? ''),
    improve: String(obj.improve ?? ''),
    summary: String(obj.summary ?? ''),
    amendedCv: obj.amendedCv ? String(obj.amendedCv) : undefined,
  };
}

/** Generate a draft CV review with Claude. Throws if the AI key is missing. */
export async function generateCvReview(
  content: CvContent,
  opts: { amend: boolean }
): Promise<CvReviewAiDraft> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('AI is not configured (ANTHROPIC_API_KEY is missing).');
  }
  const client = new Anthropic();

  const userContent: Anthropic.ContentBlockParam[] = [];
  if (content.kind === 'pdf') {
    userContent.push({
      type: 'document',
      source: { type: 'base64', media_type: 'application/pdf', data: content.base64 },
    });
  } else {
    userContent.push({ type: 'text', text: `CANDIDATE CV:\n\n${content.text}` });
  }
  userContent.push({ type: 'text', text: instruction(opts.amend) });

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: 'adaptive' },
    output_config: { effort: 'high' },
    system: SYSTEM,
    messages: [{ role: 'user', content: userContent }],
  });

  const message = await stream.finalMessage();
  const text = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n');

  if (!text.trim()) throw new Error('The AI returned an empty response.');

  const draft = parseDraft(text);
  return { ...draft, model: MODEL, generatedAt: new Date().toISOString() };
}
