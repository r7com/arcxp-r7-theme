import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { getLabelCustomFields } from './get-label-props'

/**
 * useCard hook
 * @param {Object} options - Hook options
 * @param {Object} options.customFields - Component props
 * @param {string} options.defaultFrom - The default "from" value.
 * @param {string} options.defaultSize - The default size of the collection.
 * @param {number} options.length - How many cards/items from the collection.
 */
export function useCard({ customFields, defaultFrom, defaultSize, length = 1 }) {
  const { config } = customFields
  const fusionContext = useFusionContext()
  const { arcSite } = fusionContext
  const siteProperties = getProperties(arcSite)

  /**
   * @type Collection
   * @typedef {Object} Collection
   * @property {CollectionItem[]} content_elements
   * @typedef {Object} CollectionItem
   * @property {string} _id
   * @property {{primary_section:{name:string}}} taxonomy
   * @property {{basic:string}} headlines
   * @property {{basic:{alt_text:string,auth:Record<string,string>}}} promo_items
   */
  const content = useContent({
    source: config?.contentService,
    query: {
      ...config?.contentConfigValues,
      from: config?.contentConfigValues.from ?? defaultFrom,
      size: config?.contentConfigValues.size ?? defaultSize,
    },
  })

  /** Cards quantity defined by `length` */
  const cards = [...Array(length).keys()]

  /**
   * Gets the label custom fields for each card
   * Maybe I can get this dynamically based on the collection size?
   * Then the left ones won't have propTypes for them, they will just be left behind
   */
  const labels = getLabelCustomFields({ length, customFields })

  /**
   * Join the card collection props and the custom fields for label/sponsored
   * This way we can get this information on a `blocks.map(card => card)`
   */
  const collection = cards
    .map((card, i) => {
      const collectionProps = content?.content_elements[card]
      return { ...collectionProps, customFields: { label: labels[i] } }
    })
    .filter(item => item._id)

  return {
    content,
    collection,
    siteProperties,
    fusionContext,
  }
}
