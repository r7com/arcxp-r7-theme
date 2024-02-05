import { useContent } from 'fusion:content'

export const useSiteSectionProp = (prop, sectionId) => {
  return useContent(
    sectionId
      ? {
          source: 'site-prop',
          query: { sectionId, path: prop },
        }
      : {},
  )?.value
}
