import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { getLabelCustomFields } from './get-label-props'

/**
 * useCard hook
 * @typedef {ReturnType<typeof import("./card-prop-types").getCardPropTypes>} CardPropTypes
 * @param {Object} options - Hook options
 * @param {CardPropTypes} options.customFields - Custom Fields
 * @param {string} options.defaultFrom - The default "from" value.
 * @param {string} options.defaultSize - The default size of the collection.
 * @param {number} options.length - How many cards/items from the collection.
 */
export function useCard({ customFields, defaultFrom, defaultSize, length = 1 }) {
  const { config, isGlobalContent, globalContentFrom, globalContentSize } = customFields
  const fusionContext = useFusionContext()
  const { arcSite, globalContent } = fusionContext
  const siteProperties = getProperties(arcSite)

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
  const content = isGlobalContent
    ? globalContent
    : useContent({
        source: config?.contentService,
        query: {
          ...config?.contentConfigValues,
          from: config?.contentConfigValues.from ?? defaultFrom,
          size: config?.contentConfigValues.size ?? defaultSize,
        },
      })

  /**
   * Gets the label custom fields for each card
   * Maybe I can get this dynamically based on the collection size?
   * Then the left ones won't have propTypes for them, they will just be left behind
   */
  const labels = getLabelCustomFields({ length, customFields })

  /**
   *@param {Collection} source - Hook options
   * Join the collection/globalContent props and the custom fields for label/sponsored
   * This way we can get all information on a unique `blocks.map(card => card)`
   */
  const getItemsWithCustomFields = source => {
    return source?.content_elements.map((item, i) => {
      return { ...item, customFields: { label: labels[i] } }
    })
  }

  const getSlicedItemsFromSource = () => {
    const items = getItemsWithCustomFields(content)

    if (isGlobalContent) {
      // Manual "from" and "size" when using globalContent
      return items.slice(globalContentFrom).slice(0, globalContentSize)
    }

    // Is a collection - Already sliced by the collection "size" field
    return items
  }

  const getSlicedItemsFromLength = () => {
    const items = getSlicedItemsFromSource()

    if (length) {
      /** Set a max length for the array size,
       * Two Cards Square Blocks is 2 for instance
       * Proportional Photo is 1 */
      return items.slice(0, length)
    }

    /**
     * If the user sets a "size" of 10 on a widget with 1 card, we need
     * to either slice it or not use a map the custom block code
     */
    return items
  }

  const items = getSlicedItemsFromLength()

  return {
    collection: items,
    siteProperties,
    fusionContext,
  }
}
