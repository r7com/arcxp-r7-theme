import { useContent } from 'fusion:content'

export const getColor = section => {
  if (!section?.site_topper?.section_primary_color) {
    if (!section?.parent || section?.parent?.default === '/') {
      return null
    }
    const parentSection = useContent({
      source: 'site-service-hierarchy',
      query: { hierarchy: '', sectionId: section?.parent?.default },
    })
    return getColor(parentSection)
  }
  return section.site_topper.section_primary_color
}
