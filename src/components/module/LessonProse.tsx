import React from 'react';

// Renders lightweight written content:
//   "## Heading"        → subheading
//   "- item"            → bullet list
//   blank line          → paragraph break
//   ```fenced blocks``` → code block (indentation & whitespace preserved)
//   `inline code`       → inline monospace
//
// Fenced code is essential for the automation courses, so unlike prose lines
// (which are trimmed) the lines inside a code fence are preserved verbatim.

function renderInline(text: string, keyBase: string): React.ReactNode {
  // Split on backtick-delimited inline code, keeping the delimiters.
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.length > 1 && part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={`${keyBase}-c${i}`} className="px-1 py-0.5 rounded bg-gray-100 text-[0.85em] font-mono text-gray-800">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={`${keyBase}-t${i}`}>{part}</React.Fragment>;
  });
}

export function LessonProse({ content }: { content: string }) {
  const rawLines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = (key: string) => {
    if (bullets.length) {
      const items = bullets;
      elements.push(
        <ul key={key} className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {items.map((b, i) => (
            <li key={i}>{renderInline(b, `${key}-${i}`)}</li>
          ))}
        </ul>
      );
      bullets = [];
    }
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    // Fenced code block — consume until the closing fence, preserving whitespace.
    if (line.startsWith('```')) {
      flushBullets(`ul-${i}`);
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < rawLines.length && rawLines[i].trim() !== '```') {
        codeLines.push(rawLines[i]);
        i++;
      }
      elements.push(
        <pre key={`code-${i}`} className="my-1 rounded-lg bg-navy-900 text-gray-100 text-xs p-4 overflow-x-auto">
          <code className={`font-mono whitespace-pre${lang ? ` language-${lang}` : ''}`}>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    if (!line) {
      flushBullets(`ul-${i}`);
      continue;
    }
    if (line.startsWith('## ')) {
      flushBullets(`ul-${i}`);
      elements.push(
        <h3 key={`h-${i}`} className="font-semibold text-gray-900 text-base mt-2">
          {renderInline(line.slice(3), `h-${i}`)}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      bullets.push(line.slice(2));
    } else {
      flushBullets(`ul-${i}`);
      elements.push(
        <p key={`p-${i}`} className="text-sm text-gray-700 leading-relaxed">
          {renderInline(line, `p-${i}`)}
        </p>
      );
    }
  }
  flushBullets('ul-final');

  return <div className="space-y-3">{elements}</div>;
}
