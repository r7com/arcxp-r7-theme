import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

export function getSectionProps() {
  const context = useFusionContext()
  const pageType = getPageType(context)
  const { arcSite, globalContent } = context
  const sectionId = pageType === 'home' ? '/' : globalContent?.taxonomy?.primary_section?._id
  const siteId = pageType === 'home' ? arcSite : globalContent?.canonical_website

  const content = useContent({
    source: 'custom-site-service-hierarchy',
    query: { sectionId, siteId },
  })

  return content
}

function getPageType(props = {}) {
  const { metaValue } = props
  return (metaValue && metaValue('page-type')) || ''
}
