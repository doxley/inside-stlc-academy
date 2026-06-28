// Renders lightweight written content:
//   "## Heading" → heading, "- item" → bullet, blank line → paragraph break.
export function LessonProse({ content }: { content: string }) {
  const lines = content.split('\n').map((l) => l.trim());
  const elements: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flush = (key: string) => {
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

  lines.forEach((line, i) => {
    if (!line) {
      flush(`ul-${i}`);
      return;
    }
    if (line.startsWith('## ')) {
      flush(`ul-${i}`);
      elements.push(
        <h3 key={`h-${i}`} className="font-semibold text-gray-900 text-base mt-2">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      bullets.push(line.slice(2));
    } else {
      flush(`ul-${i}`);
      elements.push(
        <p key={`p-${i}`} className="text-sm text-gray-700 leading-relaxed">
          {line}
        </p>
      );
    }
  });
  flush('ul-final');

  return <div className="space-y-3">{elements}</div>;
}
