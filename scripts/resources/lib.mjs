// ============================================================
// Inside STLC Academy — branded resource generator.
// Renders a block-based content model to DOCX and PDF with
// consistent academy branding (navy, gold headings, teal accents).
// ============================================================
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, Footer, ImageRun, ExternalHyperlink,
} from 'docx';
import { chromium } from 'playwright-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

export const BRAND = { navy: '0d1b2a', gold: 'e9b949', goldText: 'd4a438', teal: '2a9d8f', grey: '6b7280', light: 'f4f5f7' };

const LOGO_PATH = join(ROOT, 'public', 'logo.png');
const LOGO_BUF = readFileSync(LOGO_PATH);
const LOGO_DATA_URI = `data:image/png;base64,${LOGO_BUF.toString('base64')}`;

// ───────────────────────── HTML (for PDF) ─────────────────────────
function esc(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function blockToHtml(b) {
  switch (b.t) {
    case 'h1': return `<h1>${esc(b.text)}</h1>`;
    case 'h2': return `<h2>${esc(b.text)}</h2>`;
    case 'p': return `<p>${esc(b.text)}</p>`;
    case 'ul': return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
    case 'ol': return `<ol>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>`;
    case 'table':
      return `<table><thead><tr>${b.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>` +
        `<tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    case 'callout': {
      const variants = { tip: BRAND.teal, pro: BRAND.goldText, mistake: '#b91c1c', best: BRAND.teal };
      const colour = variants[b.variant] || BRAND.teal;
      return `<div class="callout" style="border-left-color:#${colour.replace('#', '')}"><div class="callout-title" style="color:#${colour.replace('#', '')}">${esc(b.title)}</div><div>${esc(b.text)}</div></div>`;
    }
    case 'spacer': return `<div style="height:12px"></div>`;
    default: return '';
  }
}

function toHtml(resource) {
  const body = resource.blocks.map(blockToHtml).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1a2333; margin: 0; font-size: 12.5px; line-height: 1.55; }
    .cover { background: #${BRAND.navy}; color: #fff; padding: 40px; }
    .cover img { height: 40px; margin-bottom: 24px; }
    .cover .kicker { color: #${BRAND.gold}; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
    .cover h1.title { font-size: 30px; margin: 8px 0 6px; color: #fff; }
    .cover .subtitle { color: #cbd5e1; font-size: 14px; max-width: 80%; }
    .cover .rule { height: 4px; width: 70px; background: #${BRAND.gold}; margin-top: 18px; }
    .content { padding: 28px 40px 40px; }
    h1 { color: #${BRAND.goldText}; font-size: 18px; margin: 22px 0 8px; border-bottom: 2px solid #${BRAND.gold}; padding-bottom: 4px; }
    h2 { color: #${BRAND.navy}; font-size: 14.5px; margin: 16px 0 6px; }
    p { margin: 6px 0; }
    ul, ol { margin: 6px 0 6px 18px; padding: 0; }
    li { margin: 3px 0; }
    table { border-collapse: collapse; width: 100%; margin: 10px 0; font-size: 11.5px; }
    th { background: #${BRAND.navy}; color: #fff; text-align: left; padding: 7px 9px; }
    td { border: 1px solid #e2e8f0; padding: 6px 9px; vertical-align: top; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    .callout { background: #f8fafc; border-left: 4px solid #${BRAND.teal}; padding: 10px 14px; margin: 12px 0; border-radius: 0 6px 6px 0; }
    .callout-title { font-weight: 700; margin-bottom: 3px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
  </style></head><body>
    <div class="cover">
      <img src="${LOGO_DATA_URI}" alt="Inside STLC Academy" />
      <div class="kicker">${esc(resource.courseTitle)}</div>
      <h1 class="title">${esc(resource.title)}</h1>
      ${resource.subtitle ? `<div class="subtitle">${esc(resource.subtitle)}</div>` : ''}
      <div class="rule"></div>
    </div>
    <div class="content">${body}</div>
  </body></html>`;
}

// ───────────────────────── DOCX ─────────────────────────
function tableBorders() {
  const b = { style: BorderStyle.SINGLE, size: 4, color: 'e2e8f0' };
  return { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b };
}

function blockToDocx(b) {
  switch (b.t) {
    case 'h1':
      return [new Paragraph({ spacing: { before: 260, after: 100 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: BRAND.gold } },
        children: [new TextRun({ text: b.text, bold: true, color: BRAND.goldText, size: 30 })] })];
    case 'h2':
      return [new Paragraph({ spacing: { before: 180, after: 60 }, children: [new TextRun({ text: b.text, bold: true, color: BRAND.navy, size: 24 })] })];
    case 'p':
      return [new Paragraph({ spacing: { after: 90 }, children: [new TextRun({ text: b.text, size: 21 })] })];
    case 'ul':
      return b.items.map((i) => new Paragraph({ bullet: { level: 0 }, spacing: { after: 40 }, children: [new TextRun({ text: i, size: 21 })] }));
    case 'ol':
      return b.items.map((i) => new Paragraph({ numbering: { reference: 'num', level: 0 }, spacing: { after: 40 }, children: [new TextRun({ text: i, size: 21 })] }));
    case 'table':
      return [new Table({
        width: { size: 100, type: WidthType.PERCENTAGE }, borders: tableBorders(),
        rows: [
          new TableRow({ tableHeader: true, children: b.headers.map((h) => new TableCell({ shading: { fill: BRAND.navy }, margins: { top: 60, bottom: 60, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 19 })] })] })) }),
          ...b.rows.map((r) => new TableRow({ children: r.map((c) => new TableCell({ margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: String(c), size: 19 })] })] })) })),
        ],
      }), new Paragraph({ spacing: { after: 80 }, children: [] })];
    case 'callout': {
      const colour = b.variant === 'mistake' ? 'b91c1c' : b.variant === 'pro' ? BRAND.goldText : BRAND.teal;
      return [new Paragraph({
        shading: { fill: 'f8fafc' }, spacing: { before: 120, after: 120 }, border: { left: { style: BorderStyle.SINGLE, size: 18, color: colour } },
        children: [new TextRun({ text: `${b.title}: `, bold: true, color: colour, size: 20 }), new TextRun({ text: b.text, size: 20 })],
      })];
    }
    case 'spacer': return [new Paragraph({ children: [] })];
    default: return [];
  }
}

function buildDocx(resource) {
  const children = [];
  // Title block
  children.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: resource.courseTitle.toUpperCase(), color: BRAND.goldText, bold: true, size: 18 })] }));
  children.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: resource.title, bold: true, color: BRAND.navy, size: 40 })] }));
  if (resource.subtitle) children.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: resource.subtitle, color: BRAND.grey, size: 22, italics: true })] }));
  children.push(new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: BRAND.gold } }, spacing: { after: 160 }, children: [] }));
  for (const b of resource.blocks) children.push(...blockToDocx(b));

  return new Document({
    creator: 'Inside STLC Academy',
    title: resource.title,
    numbering: { config: [{ reference: 'num', levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.START }] }] },
    sections: [{
      properties: { page: { margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 } } },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new ImageRun({ data: LOGO_BUF, transformation: { width: 90, height: 27 } }),
          ],
        }), new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Inside STLC Academy  ·  ${resource.courseTitle}`, color: BRAND.grey, size: 14 })] })] }),
      },
      children,
    }],
  });
}

// ───────────────────────── Driver ─────────────────────────
export async function generateAll(resources, outDir) {
  const absOut = join(ROOT, outDir);
  mkdirSync(absOut, { recursive: true });

  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage();
  const manifest = [];

  for (const r of resources) {
    // DOCX
    const docx = buildDocx(r);
    const docxBuf = await Packer.toBuffer(docx);
    writeFileSync(join(absOut, `${r.slug}.docx`), docxBuf);

    // PDF
    await page.setContent(toHtml(r), { waitUntil: 'load' });
    const pdfBuf = await page.pdf({
      format: 'A4', printBackground: true,
      margin: { top: '12mm', bottom: '18mm', left: '0mm', right: '0mm' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;font-size:8px;color:#6b7280;padding:0 14mm;display:flex;justify-content:space-between;font-family:Segoe UI,sans-serif;"><span>Inside STLC Academy &middot; ${esc(r.courseTitle)}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
    });
    writeFileSync(join(absOut, `${r.slug}.pdf`), pdfBuf);

    manifest.push({ slug: r.slug, title: r.title, category: r.category, docx: `${r.slug}.docx`, pdf: `${r.slug}.pdf` });
    console.log(`  ✓ ${r.slug}.docx + .pdf`);
  }

  await browser.close();
  return manifest;
}
