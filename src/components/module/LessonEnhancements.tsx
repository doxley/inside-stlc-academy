// Premium practical-training lesson components for Inside STLC Academy.
// Presentational only (server-component safe). Design language: dark navy
// (navy-900), gold highlights (gold-500), teal actions (brand-500/600),
// clean cards, mobile responsive.
import {
  Building2, Workflow, FlaskConical, ThumbsDown, ThumbsUp, Target,
  Eye, ClipboardCheck, Briefcase, FileText, ArrowRight,
} from 'lucide-react';
import { LessonProse } from './LessonProse';
import type {
  LessonVisualAid, LessonBadGood, LessonManagersReview, LessonResourcePreview,
} from '@/types';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-semibold text-gray-900 text-sm">{children}</p>;
}

// 1. Industry Story — why this lesson matters in a real team.
export function IndustryStoryCard({ story }: { story: string }) {
  return (
    <div className="rounded-xl border border-navy-900/10 bg-navy-900/[0.03] p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-4 h-4 text-gold-500" />
        </span>
        <SectionLabel>Industry Story</SectionLabel>
      </div>
      <div className="text-sm text-gray-700"><LessonProse content={story} /></div>
    </div>
  );
}

// 2. Visual Learning Aid — clean CSS diagrams, no images.
export function VisualLearningBlock({ visual }: { visual: LessonVisualAid }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <Workflow className="w-5 h-5 text-brand-600" />
        <SectionLabel>{visual.title}</SectionLabel>
      </div>
      <VisualBody visual={visual} />
      {visual.caption && <p className="text-xs text-gray-400 mt-3">{visual.caption}</p>}
    </div>
  );
}

function VisualBody({ visual }: { visual: LessonVisualAid }) {
  switch (visual.type) {
    case 'flow':
      return (
        <div className="flex flex-wrap items-stretch gap-2">
          {(visual.steps ?? []).map((s, i, arr) => (
            <div key={i} className="flex items-stretch gap-2">
              <div className="rounded-lg bg-brand-50 border border-brand-100 px-3 py-2 min-w-[120px]">
                <p className="text-sm font-semibold text-navy-900">{s.label}</p>
                {s.detail && <p className="text-xs text-gray-500 mt-0.5">{s.detail}</p>}
              </div>
              {i < arr.length - 1 && (
                <ArrowRight className="w-4 h-4 text-brand-400 self-center flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      );
    case 'timeline':
      return (
        <ol className="relative border-l-2 border-brand-200 ml-3 space-y-4">
          {(visual.steps ?? []).map((s, i) => (
            <li key={i} className="ml-5">
              <span className="absolute -left-[9px] w-4 h-4 rounded-full bg-brand-500 border-2 border-white" />
              <p className="text-sm font-semibold text-navy-900">{s.label}</p>
              {s.detail && <p className="text-xs text-gray-500 mt-0.5">{s.detail}</p>}
            </li>
          ))}
        </ol>
      );
    case 'comparison':
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-navy-900 text-white">
                {(visual.headers ?? []).map((h, i) => (
                  <th key={i} className="text-left font-semibold px-3 py-2 first:rounded-tl-lg last:rounded-tr-lg">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(visual.rows ?? []).map((row, ri) => (
                <tr key={ri} className="even:bg-gray-50 border-b border-gray-100">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-3 py-2 align-top ${ci === 0 ? 'font-medium text-navy-900' : 'text-gray-700'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'matrix': {
      const levelColour: Record<string, string> = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-gold-500/20 text-gold-700',
        high: 'bg-orange-100 text-orange-800',
        critical: 'bg-red-100 text-red-800',
      };
      return (
        <div className="overflow-x-auto">
          <table className="border-collapse text-xs">
            <thead>
              <tr>
                <th className="p-2" />
                {(visual.colLabels ?? []).map((c, i) => (
                  <th key={i} className="p-2 font-semibold text-navy-900 text-center">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(visual.rowLabels ?? []).map((r, ri) => (
                <tr key={ri}>
                  <th className="p-2 font-semibold text-navy-900 text-right whitespace-nowrap">{r}</th>
                  {(visual.cells?.[ri] ?? []).map((cell, ci) => (
                    <td key={ci} className="p-1">
                      <div className={`rounded-md px-2 py-2 text-center font-medium ${levelColour[cell.level ?? 'low']}`}>{cell.label}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case 'tree':
      return (
        <div className="space-y-2">
          {(visual.branches ?? []).map((b, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="rounded-md bg-navy-900 text-white text-xs font-medium px-2 py-1 flex-shrink-0">If</span>
              <span className="text-gray-700 pt-1">{b.condition}</span>
              <ArrowRight className="w-4 h-4 text-brand-400 mt-1.5 flex-shrink-0" />
              <span className="rounded-md bg-brand-50 border border-brand-100 text-navy-900 px-2 py-1">{b.outcome}</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

// 3. Worked Example — wraps existing worked_example content.
export function WorkedExampleCard({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <FlaskConical className="w-5 h-5 text-brand-600" />
        <SectionLabel>Worked Example</SectionLabel>
      </div>
      <LessonProse content={content} />
    </div>
  );
}

// 4. Bad vs Good Example.
export function BadGoodExample({ data }: { data: LessonBadGood }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <SectionLabel>Bad vs Good — {data.label}</SectionLabel>
      <div className="grid gap-3 sm:grid-cols-2 mt-3">
        <div className="rounded-lg border border-red-100 bg-red-50 p-4">
          <div className="flex items-center gap-1.5 mb-2 text-red-700"><ThumbsDown className="w-4 h-4" /><span className="text-xs font-semibold uppercase tracking-wide">Poor</span></div>
          <div className="text-sm text-gray-700"><LessonProse content={data.bad} /></div>
        </div>
        <div className="rounded-lg border border-green-100 bg-green-50 p-4">
          <div className="flex items-center gap-1.5 mb-2 text-green-700"><ThumbsUp className="w-4 h-4" /><span className="text-xs font-semibold uppercase tracking-wide">Professional</span></div>
          <div className="text-sm text-gray-700"><LessonProse content={data.good} /></div>
        </div>
      </div>
    </div>
  );
}

// 5. David's Industry Tip — highlighted coaching note.
export function IndustryTipCard({ tip }: { tip: string }) {
  return (
    <div className="rounded-xl bg-navy-900 p-5 text-white">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="w-9 h-9 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center text-xs font-bold flex-shrink-0">DO</span>
        <div>
          <p className="font-semibold text-sm leading-tight">David&apos;s Industry Tip</p>
          <p className="text-[11px] text-gray-400 leading-tight">QA Lead / Test Manager</p>
        </div>
      </div>
      <div className="text-sm text-gray-100 [&_*]:text-gray-100 [&_h3]:text-gold-400"><LessonProse content={tip} /></div>
    </div>
  );
}

// 6. Common Mistakes — wraps existing common_mistakes content.
export function CommonMistakesCard({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-5">
      <ThumbsDown className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <SectionLabel>Common Mistakes</SectionLabel>
        <div className="text-sm text-gray-700 mt-1"><LessonProse content={content} /></div>
      </div>
    </div>
  );
}

// 7. Mini Challenge — a 10–20 minute practical task.
export function MiniChallengeCard({ challenge }: { challenge: string }) {
  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-5 h-5 text-brand-600" />
        <SectionLabel>Mini Challenge</SectionLabel>
        <span className="ml-auto text-[11px] font-medium text-brand-700 bg-white border border-brand-200 rounded-full px-2 py-0.5">10–20 min</span>
      </div>
      <div className="text-sm text-gray-700"><LessonProse content={challenge} /></div>
    </div>
  );
}

// 8. Model Answer — collapsible so learners try first.
export function ModelAnswerCard({ answer }: { answer: string }) {
  return (
    <details className="group rounded-xl border border-gray-200 bg-white p-5">
      <summary className="flex items-center gap-2 cursor-pointer list-none">
        <Eye className="w-5 h-5 text-brand-600" />
        <SectionLabel>Reveal model answer</SectionLabel>
        <span className="ml-auto text-xs text-gray-400 group-open:hidden">click to expand</span>
      </summary>
      <div className="text-sm text-gray-700 mt-3 pt-3 border-t border-gray-100"><LessonProse content={answer} /></div>
    </details>
  );
}

// 9. Manager's Review — review-style feedback for key exercises.
export function ManagersReviewCard({ review }: { review: LessonManagersReview }) {
  const block = (title: string, items: string[] | undefined, colour: string) =>
    items && items.length > 0 ? (
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${colour}`}>{title}</p>
        <ul className="space-y-1">
          {items.map((it, i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5"><span className="text-gray-300">•</span>{it}</li>)}
        </ul>
      </div>
    ) : null;
  return (
    <div className="rounded-xl border border-gold-500/30 bg-gold-500/[0.06] p-5">
      <div className="flex items-center gap-2 mb-3">
        <ClipboardCheck className="w-5 h-5 text-gold-600" />
        <SectionLabel>Manager&apos;s Review</SectionLabel>
      </div>
      {review.intro && <p className="text-sm italic text-gray-600 mb-3">{review.intro}</p>}
      <div className="space-y-3">
        {block('Strengths', review.strengths, 'text-green-700')}
        {block('Gaps', review.gaps, 'text-orange-700')}
        {block('How to improve', review.improvements, 'text-brand-700')}
      </div>
    </div>
  );
}

// 10. Portfolio Builder — how the lesson contributes to the final portfolio.
export function PortfolioBuilderCard({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-gold-500/30 bg-white p-5">
      <div className="flex items-center gap-2 mb-2">
        <Briefcase className="w-5 h-5 text-gold-600" />
        <SectionLabel>Portfolio Builder</SectionLabel>
      </div>
      <div className="text-sm text-gray-700"><LessonProse content={content} /></div>
    </div>
  );
}

// 11. Resource Preview — a visible preview card for a referenced template.
export function ResourcePreviewCard({ resource }: { resource: LessonResourcePreview }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <span className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-brand-600" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="font-semibold text-navy-900 text-sm">{resource.name}</p>
            <div className="flex gap-1">
              {(resource.formats ?? []).map((f) => (
                <span key={f} className="text-[10px] font-semibold text-gray-600 bg-gray-100 rounded px-1.5 py-0.5">{f}</span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-1.5"><span className="font-medium text-gray-900">What it is:</span> {resource.purpose}</p>
          <p className="text-sm text-gray-700 mt-1"><span className="font-medium text-gray-900">When to use:</span> {resource.whenToUse}</p>
          <p className="text-xs text-gray-400 mt-2">Download from the Resource Vault.</p>
        </div>
      </div>
    </div>
  );
}
