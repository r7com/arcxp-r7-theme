import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { getLabelCustomFields } from './get-label-props'
import { getItemsWithCustomFields } from './get-items-with-custom-fields'

export function useManualCard({ contentLength, customFields }) {
  const fusionContext = useFusionContext()
  const { arcSite } = fusionContext
  const siteProperties = getProperties(arcSite)

  const indexList = [...Array(contentLength)].map((_, index) => index + 1)

  const content = indexList.map(index => {
    const { contentService, contentConfigValues } = customFields[`_id-${index}`]

    const data = useContent({
      source: contentService,
      key: {
        _id: contentConfigValues._id,
      },
    })

    return data
  })

  const labels = getLabelCustomFields({ customFields, length: contentLength })

  return { content: getItemsWithCustomFields(content, labels), fusionContext, siteProperties }
}
