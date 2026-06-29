// Shared types + constants for the Resource Vault. No Node APIs here so this
// module is safe to import from client components. The filesystem loader lives
// in resourceVault.server.ts.

export interface VaultItem {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  courseSlug: string;
  courseTitle: string;
  docxUrl: string;
  pdfUrl: string;
}

// Display order + emoji for the six Resource Vault categories.
export const VAULT_CATEGORIES: { key: string; label: string; emoji: string }[] = [
  { key: 'Templates', label: 'Templates', emoji: '📄' },
  { key: 'AI Prompt Packs', label: 'AI Prompt Packs', emoji: '🤖' },
  { key: 'Checklists', label: 'Checklists', emoji: '📋' },
  { key: 'Career Resources', label: 'Career Resources', emoji: '💼' },
  { key: 'Automation Resources', label: 'Automation Resources', emoji: '⚙️' },
  { key: 'Cheat Sheets', label: 'Cheat Sheets', emoji: '📚' },
];
