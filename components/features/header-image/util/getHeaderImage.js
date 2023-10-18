import { useContent } from 'fusion:content'

export const getHeaderImage = section => {
  if (!section?.site_topper?.section_header_image) {
    if (!section?.parent || section?.parent?.default === '/') {
      return null
    }
    const parentSection = useContent({
      source: 'site-service-hierarchy',
      query: { hierarchy: '', sectionId: section?.parent?.default },
    })
    return getHeaderImage(parentSection)
  }
  return section.site_topper.section_header_image
}
