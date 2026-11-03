import { unzipSync, strFromU8 } from 'fflate';
import { createAdminClient } from '@/lib/supabase/admin';

// What we hand to Claude: a PDF is sent natively as a document block; other
// formats are reduced to plain text.
export type CvContent = { kind: 'pdf'; base64: string } | { kind: 'text'; text: string };

/** Download a CV from the private `cv-uploads` bucket and prepare it for the model. */
export async function extractCvContent(filePath: string): Promise<CvContent> {
  const db = createAdminClient();
  const { data, error } = await db.storage.from('cv-uploads').download(filePath);
  if (error || !data) throw new Error('Could not download the CV file from storage.');

  const buf = Buffer.from(await data.arrayBuffer());
  const lower = filePath.toLowerCase();

  if (lower.endsWith('.pdf')) {
    return { kind: 'pdf', base64: buf.toString('base64') };
  }

  if (lower.endsWith('.docx')) {
    let files: Record<string, Uint8Array>;
    try {
      files = unzipSync(new Uint8Array(buf));
    } catch {
      throw new Error('The DOCX file could not be read.');
    }
    const docXml = files['word/document.xml'];
    if (!docXml) throw new Error('The DOCX file is missing its document body.');
    let xml = strFromU8(docXml);
    xml = xml
      .replace(/<\/w:p>/g, '\n')
      .replace(/<w:tab\/>/g, '\t')
      .replace(/<w:br\/>/g, '\n')
      .replace(/<[^>]+>/g, '');
    const text = xml
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .split('\n')
      .map((l) => l.trimEnd())
      .join('\n')
      .trim();
    if (!text) throw new Error('No readable text was found in the DOCX file.');
    return { kind: 'text', text };
  }

  // Fallback: treat as UTF-8 text (e.g. .txt).
  const text = buf.toString('utf8').trim();
  if (!text) throw new Error('Unsupported CV format. Please upload a PDF or DOCX.');
  return { kind: 'text', text };
}
