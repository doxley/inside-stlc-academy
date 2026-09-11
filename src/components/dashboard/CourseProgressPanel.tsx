import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GraduationCap, Gauge } from 'lucide-react';
import type { SkillProgress, GradeResult } from '@/lib/courseProgress';

function Bar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
      <div
        className={`h-full rounded-full ${percent >= 100 ? 'bg-green-500' : 'bg-brand-500'}`}
        style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
      />
    </div>
  );
}

export function CourseProgressPanel({ skills, grade }: { skills: SkillProgress[]; grade: GradeResult }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-8">
      {/* Skills — derived from completed modules */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Gauge className="w-5 h-5 text-brand-600" /><CardTitle>Your Skills</CardTitle></div>
        </CardHeader>
        <div className="space-y-3">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-gray-700">{s.name}</span>
                <span className="text-gray-400">{s.percent}%</span>
              </div>
              <Bar percent={s.percent} />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">Each skill grows as you complete the modules that build it.</p>
      </Card>

      {/* Weighted grade — derived from passed quizzes & assignments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-brand-600" /><CardTitle>Your Grade</CardTitle></div>
            {grade.distinction ? (
              <Badge variant="green">Distinction</Badge>
            ) : grade.passed ? (
              <Badge variant="green">Pass</Badge>
            ) : (
              <Badge variant="gray">In progress</Badge>
            )}
          </div>
        </CardHeader>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-gray-900">{grade.overall}%</span>
          <span className="text-xs text-gray-400">Pass 70% · Distinction 85%</span>
        </div>
        <Bar percent={grade.overall} />

        <div className="space-y-2 mt-4">
          {grade.components.map((c) => (
            <div key={c.key} className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{c.label}</span>
              <span className="text-gray-400">
                {c.done}/{c.total} · {Math.round(c.earned)}/{c.weight}%
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">Derived from quizzes and assignments you have passed — never estimated.</p>
      </Card>
    </div>
  );
}
