/**
 * Get the label type (Prisma = "blog", Estúdo = "studio") by the taxonomy site
 * @returns {string}
 */
export function getLabelTypeBySite({ taxonomy }) {
  const LABEL_TYPE_BY_SITE = {
    '/prisma': 'blog',
    '/estudio': 'studio',
  }

  return LABEL_TYPE_BY_SITE[taxonomy?.primary_site?.path]
}
