import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

export function getSectionPropsContent() {
  const context = useFusionContext()
  const pageType = getPageType(context)
  const { arcSite, globalContent } = context

  const mapping = {
    section: [globalContent?._id, globalContent?._website],
    article: [globalContent?.taxonomy?.primary_section?._id, globalContent?.canonical_website],
  }[pageType]

  const sectionId = mapping ? mapping[0] : '/'
  const siteId = mapping ? mapping[1] : arcSite

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
