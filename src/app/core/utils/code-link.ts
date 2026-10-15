/** Nom de la plateforme d'un lien de dépôt : GitHub, GitLab, ou "Code source" pour un autre hébergeur. */
export function codeLinkLabel(url: string | undefined): string {
  try {
    const host = new URL(url ?? '').hostname.toLowerCase();
    if (host.includes('github')) {
      return 'GitHub';
    }
    if (host.includes('gitlab')) {
      return 'GitLab';
    }
  } catch {
    // URL invalide : libellé générique.
  }
  return 'Code source';
}
