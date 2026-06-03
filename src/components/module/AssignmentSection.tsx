'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, getSubmissionStatusColour, getSubmissionStatusLabel } from '@/lib/utils';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import type { Assignment, AssignmentSubmission } from '@/types';

const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/png', 'image/jpeg', 'application/zip'];
const MAX_SIZE = 25 * 1024 * 1024; // 25 MB

interface Props {
  assignment: Assignment;
  userId: string;
  courseId: string;
  latestSubmission: AssignmentSubmission | undefined;
  allSubmissions: AssignmentSubmission[];
}

export function AssignmentSection({ assignment, userId, courseId, latestSubmission, allSubmissions }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const onDrop = useCallback((accepted: File[], rejected: { errors: { message: string }[] }[]) => {
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

    const { error: dbError } = await supabase.from('assignment_submissions').insert({
      assignment_id: assignment.id,
      user_id: userId,
      file_url: path,
      original_filename: file.name,
      status: 'submitted',
    });

    if (dbError) {
      setUploadError('Submission failed: ' + dbError.message);
      setUploading(false);
      return;
    }

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
      {assignment.instructions && (
        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
          {assignment.instructions}
        </div>
      )}

      {/* Latest submission status */}
      {latestSubmission && (
        <div className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Current submission</p>
              <p className="text-xs text-gray-500 mt-0.5">{latestSubmission.original_filename}</p>
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
