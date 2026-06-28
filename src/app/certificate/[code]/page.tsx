import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createAdminClient } from '@/lib/supabase/admin';
import { formatDate } from '@/lib/utils';
import { PrintButton } from '@/components/certificate/PrintButton';

export const metadata: Metadata = {
  title: 'Certificate | Inside STLC Academy',
  robots: { index: false },
};

export default async function CertificatePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const db = createAdminClient();

  const { data: certificate } = await db
    .from('certificates')
    .select('*, profiles(first_name, last_name), courses(title)')
    .eq('certificate_code', code)
    .maybeSingle();

  if (!certificate || certificate.status !== 'issued') notFound();

  const profile = certificate.profiles as { first_name: string | null; last_name: string | null } | null;
  const course = certificate.courses as { title: string } | null;
  const learnerName = `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim() || 'Learner';
  const issued = certificate.issued_at ? formatDate(certificate.issued_at) : '';

  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col items-center justify-center px-4 py-12 print:bg-white print:py-0">
      {/* Certificate */}
      <div className="w-full max-w-3xl bg-white text-navy-900 rounded-2xl border-4 border-gold-500 shadow-2xl p-8 sm:p-12 text-center print:border-gold-500 print:shadow-none">
        <Image src="/logo.png" alt="Inside STLC Academy" width={180} height={54} className="h-12 w-auto mx-auto mb-8" />

        <p className="text-sm uppercase tracking-[0.2em] text-brand-600 font-semibold mb-2">Certificate of Completion</p>
        <div className="w-16 h-1 bg-gold-500 mx-auto mb-8" />

        <p className="text-gray-500 mb-2">This certifies that</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">{learnerName}</h1>
        <p className="text-gray-500 mb-2">has successfully completed</p>
        <h2 className="text-xl sm:text-2xl font-semibold text-brand-700 mb-8">{course?.title}</h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-gray-500 border-t border-gray-200 pt-6">
          <div>
            <p className="font-semibold text-navy-900">{issued}</p>
            <p className="text-xs uppercase tracking-wide">Date of completion</p>
          </div>
          <div>
            <p className="font-semibold text-navy-900">Inside STLC Academy</p>
            <p className="text-xs uppercase tracking-wide">Issued by</p>
          </div>
          <div>
            <p className="font-mono font-semibold text-navy-900">{certificate.certificate_code}</p>
            <p className="text-xs uppercase tracking-wide">Certificate ID</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 print:hidden">
        <PrintButton />
        <p className="text-gray-500 text-sm">
          Verify this certificate at <span className="text-brand-300">/certificate/{certificate.certificate_code}</span>
        </p>
      </div>
    </div>
  );
}
