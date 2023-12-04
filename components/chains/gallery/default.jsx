import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import { isServerSide, LazyLoad } from '@wpmedia/arc-themes-components'
import { Image } from '../../../util/components/Image'

const BLOCK_CLASS_NAME = 'b-vertical-gallery'

export const VerticalGalleryChainPresentation = ({ children, customFields = {}, context }) => {
  const { globalContent: items = {} } = context
  const { content_elements: contentElements = [] } = items
  const { elementPlacement: adPlacementConfigObj = {} } = customFields

  const contentElementsImages = contentElements.filter(element => element.type === 'image')
  if (!contentElementsImages.length) {
    return null
  }

  const adPlacements = Object.keys(adPlacementConfigObj).map(key => ({
    feature: +key,
    image: +adPlacementConfigObj[key],
  }))
  console.log(contentElementsImages)
  let imagesCounter = 0
  const elements = [
    ...contentElementsImages.map((imageItem, index) => {
      // Start at 1 since the ad configs use one-based array indexes
      imagesCounter += 1
      const adsAfterImage = adPlacements.filter(placement => placement.image === imagesCounter)
      // The ad features should follow the content element if they exist, but not if
      // the current image is the last or second-to-last paragraph.
      if (adsAfterImage.length && imagesCounter < contentElementsImages.length - 1) {
        console.log(imageItem)
        return [
          //  parseArticleItem(contentElement, index, arcSite, phrases, id, customFields),
          <Image
            key={`${index}_${imageItem._id}`}
            item={imageItem}
            customFields={customFields}
            className={`${BLOCK_CLASS_NAME}__item`}
          />,
          ...adsAfterImage.map(placement => children[placement.feature - 1]),
        ]
      }
      return (
        <Image
          key={`${index}_${imageItem._id}`}
          item={imageItem}
          customFields={customFields}
          className={`${BLOCK_CLASS_NAME}__item`}
        />
      )
    }),
  ]
  console.log(elements)
  return <article className={BLOCK_CLASS_NAME}>{elements}</article>
}

const VerticalGalleryChain = ({ children, customFields = {} }) => {
  const context = useFusionContext()
  const { isAdmin } = context
  if (customFields?.lazyLoad && isServerSide() && !isAdmin) {
    return null
  }
  return (
    <LazyLoad enabled={customFields?.lazyLoad && !isAdmin}>
      <VerticalGalleryChainPresentation context={context} customFields={customFields}>
        {children}
      </VerticalGalleryChainPresentation>
    </LazyLoad>
  )
}

VerticalGalleryChain.propTypes = {
  customFields: PropTypes.shape({
    elementPlacement: PropTypes.kvp.tag({
      label: 'Ad placements',
      group: 'Inline ads',
      description:
        'Places your inline article body ads in the article body chain. For each ad feature in the chain, fill in two values below: Field 1) The position of the ad within the chain and Field 2) the paragraph number that this ad should follow in the article body. For example, entering 1 and 3 would mean that the first ad in the article body chain will be placed after the third paragraph in the article.',
    }),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description:
        'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
    hideImageTitle: PropTypes.bool.tag({
      description: 'This display option applies to all Galleries in the Article Body',
      label: 'Hide Title',
      defaultValue: false,
      group: 'Gallery Display Options',
    }),
    hideImageCaption: PropTypes.bool.tag({
      description: 'This display option applies to all Galleries in the Article Body',
      label: 'Hide Caption',
      defaultValue: false,
      group: 'Gallery Display Options',
    }),
    hideImageCredits: PropTypes.bool.tag({
      description: 'This display option applies to all Galleries in the Article Body',
      label: 'Hide Credits',
      defaultValue: false,
      group: 'Gallery Display Options',
    }),
  }),
}

VerticalGalleryChain.label = 'Vertical Gallery – R7 Block'

VerticalGalleryChain.icon = 'arc-article'

export default VerticalGalleryChain
