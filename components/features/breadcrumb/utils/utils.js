import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useSiteSectionProp } from '../../../../util/useSiteTopperProp'
const SECTION_NAME = 'navigation.nav_title'

function countSlashes(obj) {
  return (obj.url.match(/\//g) || []).length
}

export const breadcrumbProxy = () => {
  const { globalContent, arcSite, metaValue } = useFusionContext()
  const { websiteDomain, websiteName } = getProperties(arcSite)

  if (!globalContent || !websiteDomain) return null

  const pageType = metaValue('page-type')
  const isArticle = pageType === 'article' || pageType === 'gallery'
  const isSection = pageType === 'section' || pageType === 'grouping'

  const defaultSection = [
    {
      name: websiteName,
      url: websiteDomain,
      id: websiteDomain,
    },
  ]

  if (isArticle) {
    const { taxonomy, canonical_website } = globalContent
    const sections = taxonomy?.sections || []

    const sectionNames = sections
      .filter(el => el._website === canonical_website)
      .map(el => {
        return {
          url: el.path,
          name: el.name,
        }
      })
      .sort((a, b) => countSlashes(a) - countSlashes(b))
    console.log('sectionNames', sectionNames)

    sectionNames.forEach(el => {
      defaultSection.push({
        name: el.name,
        url: `${websiteDomain}${el.url}`,
        id: `${websiteDomain}${el.url}`,
      })
    })
    return defaultSection
  }
  if (isSection) {
    const { _id } = globalContent
    const splitSctions = _id.split('/').filter(el => !!el)
    const sectionIds = splitSctions.map(
      (element, index) => '/' + splitSctions.slice(0, index + 1).join('/'),
    )
    const sectionNames = sectionIds.map(el => {
      return {
        url: el,
        name: useSiteSectionProp(SECTION_NAME, el),
      }
    })
    sectionNames.forEach(el => {
      defaultSection.push({
        name: el.name,
        url: `${websiteDomain}${el.url}`,
        id: `${websiteDomain}${el.url}`,
      })
    })
    return defaultSection
  }
}
