import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { getLabelCustomFields } from './get-label-props'
import { getItemsWithCustomFields } from './get-items-with-custom-fields'

/**
 * useManualCard hook
 * @type ManualCardOptions
 * @typedef {Object} ManualCardOptions
 * @property {number=} length The max number of cards on the `collection` array
 * @typedef {ReturnType<typeof import("./card-prop-types").getCardPropTypes>} CardPropTypes
 * @param {ManualCardOptions & {customFields:CardPropTypes}} options
 */
export function useManualCard({ length, customFields }) {
  const fusionContext = useFusionContext()
  const { arcSite } = fusionContext
  const siteProperties = getProperties(arcSite)

  const indexList = [...Array(length)].map((_, index) => index + 1)

  const content = indexList.map(index => {
    const { contentService, contentConfigValues } = customFields[`_id-${index}`]

    const data = useContent({
      source: contentService,
      key: {
        _id: contentConfigValues._id,
      },
    })

    const imageAnsData = customFields[`image-${index}`]?.trim()
      ? useContent({
          source: 'photo-api',
          query: { _id: customFields[`image-${index}`].match(/(\w*).\w*$/i)[1] },
        })
      : data?.promo_items?.basic
      ? data.promo_items.basic
      : false

    return {
      ...data,
      promo_items: { basic: imageAnsData },
      headlines: {
        ...data?.headlines,
        basic: customFields[`headline-${index}`] || data?.headlines?.basic,
      },
      canonical_url: customFields[`link-${index}`] || data?.canonical_url,
      taxonomy: {
        ...data?.taxonomy,
        primary_section: {
          ...data?.taxonomy?.primary_section,
          name: customFields[`hat-${index}`] || data?.taxonomy?.primary_section?.name,
        },
      },
    }
  })

  const labels = getLabelCustomFields({ customFields, length })

  return { content: getItemsWithCustomFields(content, labels), fusionContext, siteProperties }
}
