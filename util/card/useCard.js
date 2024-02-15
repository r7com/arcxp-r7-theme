import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { getLabelCustomFields } from './get-label-props'

/**
 * useCard hook
 * @type CardOptions
 * @typedef {Object} CardOptions
 * @property {string} defaultFrom The default "from" value
 * @property {string} defaultSize The default "size" of the collection
 * @property {number=} length The max number of cards on the `collection` array
 * @typedef {ReturnType<typeof import("./card-prop-types").getCardPropTypes>} CardPropTypes
 * @param {CardOptions & {customFields:CardPropTypes}} options
 */
export function useCard({ customFields, defaultFrom, defaultSize, length }) {
  const { config } = customFields
  const fusionContext = useFusionContext()
  const { arcSite, globalContent } = fusionContext
  const siteProperties = getProperties(arcSite)

  const CONTENT_SERVICE_QUERY = {
    collections: {
      ...config?.contentConfigValues,
      from: config?.contentConfigValues?.from ?? defaultFrom,
      size: config?.contentConfigValues?.size ?? defaultSize,
    },
    'story-feed-sections': {
      includeSections: globalContent?._id,
      feedOffset: config?.contentConfigValues?.feedOffset ?? defaultFrom,
      feedSize: config?.contentConfigValues?.feedSize ?? defaultSize,
    },
  }

  /**
   * @type Collection
   * @typedef {Object} Collection
   * @property {CollectionItem[]} content_elements
   * @typedef {Object} CollectionItem
   * @property {string} _id
   * @property {string} canonical_url
   * @property {{primary_section:{name:string}}} taxonomy
   * @property {{basic:string}} headlines
   * @property {{basic:{alt_text:string,auth:Record<string,string>}}} promo_items
   * Uses globalContent for automatic homes when "Usar conteúdo global" is checked,
   * and the collection when it's not checked
   */
  const content = useContent({
    source: config?.contentService,
    query: CONTENT_SERVICE_QUERY[config?.contentService] ?? {},
  })

  /**
   * Gets the label custom fields for each card
   * Maybe I can get this dynamically based on the collection size?
   * Then the left ones won't have propTypes for them, they will just be left behind
   */
  const labels = getLabelCustomFields({ length, customFields })

  /**
   *@param {Collection["content_elements"]} items - Hook options
   * Join the collection/globalContent props and the custom fields for label/sponsored
   * This way we can get all information on a unique `blocks.map(card => card)`
   */
  const getItemsWithCustomFields = items => {
    return items?.map((item, i) => {
      return { ...item, customFields: { label: labels[i] } }
    })
  }

  const getSlicedItems = () => {
    let items = content?.content_elements

    if (length) {
      /** Set a max length for the array size,
       * Two Cards Square Blocks is 2 for instance
       * Proportional Photo is 1 */
      items = items?.slice(0, length)
    }

    return getItemsWithCustomFields(items)
  }

  return {
    collection: getSlicedItems(),
    siteProperties,
    fusionContext,
  }
}
