export const breadcrumbProxy = (globalContent, websiteDomain) => {
  if (!globalContent || !websiteDomain) return null

  const { websites, website } = globalContent
  const path = websites && websites[website]?.website_section?.path
  const sectionNames = path?.replace('/', '')?.replaceAll('-', ' ')?.split('/')
  sectionNames?.unshift(website)

  return (
    sectionNames?.length &&
    sectionNames?.map((sectionName, index) => {
      const url = createURL({ websiteDomain, sectionNames, index })
      return {
        name: sectionName,
        url,
        id: `${sectionName}${index}`,
      }
    })
  )
}

const createURL = ({ websiteDomain, sectionNames, index }) => {
  return `${websiteDomain}/${sectionNames
    ?.slice(1, index + 1)
    ?.join('/')
    ?.replaceAll(' ', '-')}`
}
