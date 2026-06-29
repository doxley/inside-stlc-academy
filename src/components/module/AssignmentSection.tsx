'use client';

import { useState, useCallback } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, getSubmissionStatusColour, getSubmissionStatusLabel } from '@/lib/utils';
import { Upload, FileText, FileType, AlertCircle, Library } from 'lucide-react';
import Link from 'next/link';
import type { Assignment, AssignmentSubmission } from '@/types';

interface AssignmentTemplate {
  label: string;
  pdfUrl: string;
  docxUrl: string;
}

const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/png', 'image/jpeg', 'application/zip'];
const MAX_SIZE = 25 * 1024 * 1024; // 25 MB

interface Props {
  assignment: Assignment;
  userId: string;
  courseId: string;
  latestSubmission: AssignmentSubmission | undefined;
  allSubmissions: AssignmentSubmission[];
  template: AssignmentTemplate | null;
  brief: AssignmentTemplate | null;
}

export function AssignmentSection({ assignment, userId, courseId, latestSubmission, allSubmissions, template, brief }: Props) {
  const isUrl = assignment.submission_type === 'url';
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploaded, setUploaded] = useState(false);

  function notifyAdmin(submissionId: string) {
    fetch('/api/notifications/submission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId }),
    }).catch(() => {});
  }

  async function handleSubmitUrl() {
    const trimmed = url.trim();
    if (!/^https?:\/\/.+/i.test(trimmed)) {
      setUploadError('Enter a valid URL starting with http(s)://');
      return;
    }
    setUploading(true);
    setUploadError('');
    const supabase = createClient();
    const { data: inserted, error } = await supabase.from('assignment_submissions').insert({
      assignment_id: assignment.id,
      user_id: userId,
      file_url: trimmed,
      submission_url: trimmed,
      original_filename: 'Submitted link',
      status: 'submitted',
    }).select('id').single();

    if (error) {
      setUploadError('Submission failed: ' + error.message);
      setUploading(false);
      return;
    }
    if (inserted?.id) notifyAdmin(inserted.id);
    setUploaded(true);
    setUploading(false);
    setUrl('');
  }

  const onDrop = useCallback((accepted: File[], rejected: FileRejection[]) => {
    setUploadError('');
    if (rejected.length > 0) {
      setUploadError(rejected[0].errors[0]?.message ?? 'File rejected.');
      return;
    }
    setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/zip': ['.zip'],
    },
    maxSize: MAX_SIZE,
    multiple: false,
  });

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setUploadError('');

    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const path = `${userId}/${assignment.id}/${Date.now()}.${ext}`;

    const { error: storageError } = await supabase.storage
      .from('assignment-submissions')
      .upload(path, file, { upsert: false });

    if (storageError) {
      setUploadError('Upload failed: ' + storageError.message);
      setUploading(false);
      return;
    }

    const { data: inserted, error: dbError } = await supabase.from('assignment_submissions').insert({
      assignment_id: assignment.id,
      user_id: userId,
      file_url: path,
      original_filename: file.name,
      status: 'submitted',
    }).select('id').single();

    if (dbError) {
      setUploadError('Submission failed: ' + dbError.message);
      setUploading(false);
      return;
    }

    // Notify the admin (best-effort — never blocks the submission).
    if (inserted?.id) notifyAdmin(inserted.id);

    setUploaded(true);
    setUploading(false);
    setFile(null);
  }

  const canResubmit = latestSubmission?.status === 'needs_changes';

  if (uploaded) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <FileText className="w-6 h-6 text-green-600" />
        </div>
        <p className="font-medium text-gray-900">Assignment submitted!</p>
        <p className="text-sm text-gray-500 mt-1">Your tutor will review it and provide feedback.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Full assignment brief — the primary, module-specific document */}
      {brief && (
        <div className="p-4 rounded-lg border border-navy-900/15 bg-navy-900/[0.03]">
          <div className="flex items-start gap-3">
            <span className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-gold-500" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy-900 text-sm">Assignment brief</p>
              <p className="text-xs text-gray-600 mt-0.5">Read the full brief — scenario, what to submit, step-by-step, and how your work is assessed.</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <a href={brief.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-navy-900 text-white hover:bg-navy-800 transition-colors">
                  <FileText className="w-3.5 h-3.5" />Read brief (PDF)
                </a>
                <a href={brief.docxUrl} download className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                  <FileType className="w-3.5 h-3.5" />DOCX
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {assignment.instructions && (
        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
          {assignment.instructions}
        </div>
      )}

      {/* Downloadable assignment template (a Resource Vault doc) */}
      {template && (
        <div className="p-4 border border-brand-100 bg-brand-50/50 rounded-lg">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Assignment template</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Use <span className="font-medium">{template.label}</span> to structure your submission.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <a
                  href={template.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-navy-900 text-white hover:bg-navy-800 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />PDF
                </a>
                <a
                  href={template.docxUrl}
                  download
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FileType className="w-3.5 h-3.5" />DOCX
                </a>
                <Link
                  href="/dashboard/vault"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-brand-700 hover:bg-brand-50 transition-colors"
                >
                  <Library className="w-3.5 h-3.5" />More in the Resource Vault
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Latest submission status */}
      {latestSubmission && (
        <div className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Current submission</p>
              {latestSubmission.submission_url ? (
                <a href={latestSubmission.submission_url} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:underline break-all mt-0.5 inline-block">
                  {latestSubmission.submission_url}
                </a>
              ) : (
                <p className="text-xs text-gray-500 mt-0.5">{latestSubmission.original_filename}</p>
              )}
              <p className="text-xs text-gray-400">{formatDate(latestSubmission.submitted_at)}</p>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubmissionStatusColour(latestSubmission.status)}`}>
              {getSubmissionStatusLabel(latestSubmission.status)}
            </span>
          </div>
          {latestSubmission.feedback && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-800 mb-1">Tutor feedback</p>
              <p className="text-sm text-blue-900">{latestSubmission.feedback}</p>
            </div>
          )}
        </div>
      )}

      {/* Upload area — show if no submission yet, or needs_changes */}
      {(!latestSubmission || canResubmit) && (
        <div>
          {canResubmit && (
            <p className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-lg mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Please address the feedback and resubmit your assignment.
            </p>
          )}

          {isUrl ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Submission URL</label>
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://github.com/your-username/your-repo"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <p className="text-xs text-gray-400 mt-1">Paste a public link (e.g. your GitHub repository).</p>
              {uploadError && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />{uploadError}
                </p>
              )}
              <div className="mt-4">
                <Button onClick={handleSubmitUrl} loading={uploading} disabled={!url.trim()}>
                  Submit link
                </Button>
              </div>
            </div>
          ) : (
          <>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-brand-400 bg-brand-50'
                : file
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 hover:border-brand-300 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className={`w-8 h-8 mx-auto mb-3 ${file ? 'text-green-500' : 'text-gray-400'}`} />
            {file ? (
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-700">Drop your file here, or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOCX, XLSX, PNG, JPG, ZIP — max 25 MB</p>
              </div>
            )}
          </div>

          {uploadError && (
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {uploadError}
            </p>
          )}

          {file && (
            <div className="flex gap-3 mt-4">
              <Button onClick={handleUpload} loading={uploading}>
                Submit assignment
              </Button>
              <Button variant="ghost" onClick={() => setFile(null)}>
                Remove file
              </Button>
            </div>
          )}
          </>
          )}
        </div>
      )}

      {/* Past submissions history */}
      {allSubmissions.length > 1 && (
        <details className="text-xs">
          <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
            View submission history ({allSubmissions.length})
          </summary>
          <div className="mt-2 space-y-1 pl-2">
            {allSubmissions.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 text-gray-500">
                <span>#{allSubmissions.length - i}</span>
                <span>{s.original_filename}</span>
                <span>{formatDate(s.submitted_at)}</span>
                <Badge variant={s.status === 'passed' ? 'green' : s.status === 'needs_changes' ? 'red' : 'gray'}>
                  {getSubmissionStatusLabel(s.status)}
                </Badge>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
