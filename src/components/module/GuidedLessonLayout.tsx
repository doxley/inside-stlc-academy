import { Clock, BookOpen, NotebookPen, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface Props {
  moduleNumber: number;
  title: string;
  courseName: string;
  estimatedTime?: string | null;
  isCompleted: boolean;
  /** Short written explanation of what the learner will understand. */
  lessonOverview?: string | null;
  /** Structured written lesson content (headings, key points, examples). */
  guidedNotes?: string | null;
  /** Dynamic sections: practical activity, resources, reflection, mark-complete. */
  children?: React.ReactNode;
}

// Renders a written, guided-learning module: header → Lesson Overview →
// Guided Lesson Notes → (dynamic sections via children). No video is implied
// or required; courses are practical written programmes.
//
// Guided notes support lightweight formatting:
//   "## Heading"  → section heading
//   "- item"      → bullet point
//   blank line    → paragraph break
export function GuidedLessonLayout({
  moduleNumber,
  title,
  courseName,
  estimatedTime,
  isCompleted,
  lessonOverview,
  guidedNotes,
  children,
}: Props) {
  return (
    <div className="space-y-6">
      {/* 1. Module Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-medium text-brand-600 mb-1">
            {courseName} · Module {moduleNumber}
          </p>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {estimatedTime && (
            <p className="text-sm text-gray-400 mt-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Estimated completion time: {estimatedTime}
            </p>
          )}
        </div>
        <Badge variant={isCompleted ? 'green' : 'gray'} className="flex items-center gap-1">
          {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
          {isCompleted ? 'Completed' : 'In progress'}
        </Badge>
      </div>

      {/* 2. Lesson Overview */}
      {lessonOverview && (
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 bg-brand-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-brand-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Lesson Overview</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{lessonOverview}</p>
        </section>
      )}

      {/* 3. Guided Lesson Notes */}
      {guidedNotes && (
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-brand-100 rounded-lg flex items-center justify-center">
              <NotebookPen className="w-4 h-4 text-brand-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Guided Lesson Notes</h2>
          </div>
          <GuidedNotes content={guidedNotes} />
        </section>
      )}

      {/* 4–7: practical activity, resources, reflection, mark-complete */}
      {children}
    </div>
  );
}

function GuidedNotes({ content }: { content: string }) {
  const blocks = content.split('\n').map((l) => l.trim());
  const elements: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = (key: string) => {
    if (bullets.length) {
      elements.push(
        <ul key={key} className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      );
      bullets = [];
    }
  };

  blocks.forEach((line, i) => {
    if (!line) {
      flushBullets(`ul-${i}`);
      return;
    }
    if (line.startsWith('## ')) {
      flushBullets(`ul-${i}`);
      elements.push(
        <h3 key={`h-${i}`} className="font-semibold text-gray-900 text-sm mt-2">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      bullets.push(line.slice(2));
    } else {
      flushBullets(`ul-${i}`);
      elements.push(
        <p key={`p-${i}`} className="text-sm text-gray-700 leading-relaxed">
          {line}
        </p>
      );
    }
  });
  flushBullets('ul-final');

  return <div className="space-y-3">{elements}</div>;
}
