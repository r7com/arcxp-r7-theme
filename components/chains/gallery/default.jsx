import './default.scss'
import React, { useState } from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import { isServerSide, LazyLoad } from '@wpmedia/arc-themes-components'
import { GalleryItem } from './_children/galleryItem'
import { GalleryFullscreen } from '../../../util/components/FullscreenGallery'
import getProperties from 'fusion:properties'
import { SocialShare, useArticleAction } from '@r7/ui-article-delivery'

const BLOCK_CLASS_NAME = 'b-vertical-gallery'

const VerticalGalleryChain = ({ children, customFields = {} }) => {
  const { fontSize } = useArticleAction()
  const [fullscreen, setFullscreen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const context = useFusionContext()
  const { isAdmin, globalContent: items = {} } = context
  const { content_elements: contentElements = [], _id, website_url, website, taxonomy } = items
  const sectionName = taxonomy?.primary_section?.name
  const { websiteDomain } = getProperties(context.arcSite)

  if (customFields?.lazyLoad && isServerSide() && !isAdmin) {
    return null
  }
  const contentElementsImages = contentElements.filter(element => element.type === 'image')
  if (!contentElementsImages.length) {
    return null
  }
  const adPlacements = customFields.elementPlacement
    ? Object.keys(customFields.elementPlacement).map(key => ({
        feature: +key,
        image: +customFields.elementPlacement[key],
      }))
    : null
  let imagesCounter = 0
  const urlForShare = encodeURI(`${websiteDomain}${website_url}`)
  const elements = [
    ...contentElementsImages.map((imageItem, index) => {
      if (!adPlacements) {
        return (
          <GalleryItem
            key={`${index}_${imageItem._id}`}
            itemIndex={index}
            item={imageItem}
            customFields={customFields}
            className={`${BLOCK_CLASS_NAME}__item`}
            setFullscreen={setFullscreen}
            setActiveSlide={setActiveSlide}
            urlForShare={urlForShare}
          />
        )
      }
      imagesCounter += 1
      const adsAfterImage = adPlacements.filter(placement => placement.image === imagesCounter)
      if (adsAfterImage.length && imagesCounter < contentElementsImages.length - 1) {
        return [
          <GalleryItem
            key={`${index}_${imageItem._id}`}
            itemIndex={index}
            item={imageItem}
            customFields={customFields}
            className={`${BLOCK_CLASS_NAME}__item`}
            setFullscreen={setFullscreen}
            setActiveSlide={setActiveSlide}
            urlForShare={urlForShare}
          />,
          ...adsAfterImage.map(placement => children[placement.feature - 1]),
        ]
      }
      return (
        <GalleryItem
          key={`${index}_${imageItem._id}`}
          itemIndex={index}
          item={imageItem}
          customFields={customFields}
          className={`${BLOCK_CLASS_NAME}__item`}
          setFullscreen={setFullscreen}
          setActiveSlide={setActiveSlide}
          urlForShare={urlForShare}
        />
      )
    }),
    <GalleryFullscreen
      key={_id}
      setFullscreen={setFullscreen}
      className={`gallery__overlay`}
      isOpen={fullscreen}
      elements={contentElementsImages}
      initialSlide={activeSlide}
      urlForShare={urlForShare}
      website={sectionName || website}
    />,
  ]
  return (
    <LazyLoad enabled={customFields?.lazyLoad && !isAdmin}>
      <section className={BLOCK_CLASS_NAME} style={{ '--font-size': `${fontSize}` }}>
        {elements}
        <div className="gallery__social-share">
          <SocialShare>
            <SocialShare.List>
              <SocialShare.Item
                name="googleNews"
                link={urlForShare}
                title="google-news"
                position="rodape-gallery"
              />
              <SocialShare.Item
                name="facebook"
                link={urlForShare}
                title="facebook"
                position="rodape-gallery"
              />
              <SocialShare.Item
                name="twitter"
                link={urlForShare}
                title="twitter"
                position="rodape-gallery"
              />
              <SocialShare.Item
                name="whatsapp"
                link={urlForShare}
                title="whatsapp"
                position="rodape-gallery"
              />
              <SocialShare.Item
                name="linkedin"
                link={urlForShare}
                title="linkedin"
                position="rodape-gallery"
              />
              <SocialShare.Item
                name="share"
                link={urlForShare}
                title="share"
                position="rodape-gallery"
              />
            </SocialShare.List>
          </SocialShare>
        </div>
      </section>
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
