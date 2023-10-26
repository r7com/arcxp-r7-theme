import { useContent } from 'fusion:content'

export const getSectionSocial = (prop = '', section) => {
  if (!section?.social?.[prop]) {
    if (!section?.parent || section?.parent?.default === '/') {
      return null
    }
    const parentSection = useContent({
      source: 'site-service-hierarchy',
      query: { hierarchy: '', sectionId: section.parent.default },
    })
    return getSectionSocial(prop, parentSection)
  }
  return section.social[prop]
}
