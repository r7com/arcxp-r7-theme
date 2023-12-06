export const breadcrumbProxy = (globalContent, websiteDomain) => {
  if (!globalContent && !websiteDomain) return null

  const { websites, website } = globalContent
  const path = websites && websites[website]?.website_section?.path
  const sectionNames = path?.replace('/', '')?.replaceAll('-', ' ')?.split('/')
  sectionNames?.unshift(website)

  return (
    sectionNames?.length &&
    sectionNames?.map((section, i) => {
      const urlFull = `${websiteDomain}/${sectionNames
        ?.slice(1, i + 1)
        ?.join('/')
        ?.replaceAll(' ', '-')}`

      return {
        name: section,
        url: urlFull,
      }
    })
  )
}
