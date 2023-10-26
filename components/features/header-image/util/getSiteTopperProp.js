import { useContent } from 'fusion:content'

export const getSiteTopperProp = (prop = '', section) => {
  if (!section?.site_topper?.[prop]) {
    if (!section?.parent || section?.parent?.default === '/') {
      return null
    }
    const parentSection = useContent({
      source: 'site-service-hierarchy',
      query: { hierarchy: '', sectionId: section.parent.default },
    })
    return getSiteTopperProp(prop, parentSection)
  }
  return section.site_topper[prop]
}
