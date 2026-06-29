import { redirect } from 'next/navigation';

// The old Resource Library read from the (unused) `resources` table. The
// Resource Vault (/dashboard/vault) is the live, populated experience, so this
// route now redirects there to avoid an empty page and duplicate entry points.
export default function ResourceLibraryRedirect() {
  redirect('/dashboard/vault');
}
