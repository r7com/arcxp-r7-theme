/**
 * Get the hat image (16x16) by site and the name of the current section by the taxonomy
 */
export function getHatBySite({ taxonomy }) {
  const HAT_IMAGE_BY_SITE = {
    '/prisma': 'https://img.r7.com/images/logo-lance-16062023142649470?dimensions=16x16',
    '/estudio': 'https://img.r7.com/images/jogada-10-13062023162923564?dimensions=16x16',
  }

  return {
    /** 16x16 @type string | null */
    image: HAT_IMAGE_BY_SITE[taxonomy?.primary_site?.path],
    /** @type string | null */
    name: taxonomy?.primary_section?.name,
  }
}
