import './default.scss'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'

import {
  Conditional,
  Divider,
  formatCredits,
  getAspectRatio,
  Heading,
  HeadingSection,
  Image,
  isServerSide,
  LazyLoad,
  Link,
  Paragraph,
  usePhrases,
  MediaItem,
  Video,
} from '@wpmedia/arc-themes-components'

import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'

import { Text } from '@r7/ui-base-components'

import Header from './_children/heading'
import HTML from './_children/html'
import List from './_children/list'
import Oembed from './_children/oembed'
import Table from './_children/table'
import CustomEmbed from './_children/custom-embed'
import Quote from './_children/quote'
import LinkList from './_children/link-list'
import { Gallery } from './_children/gallery'
import { IMAGE_FULLWIDTH_FORMAT } from './constants'

const BLOCK_CLASS_NAME = 'b-article-body'

function parseArticleItem(item, index, arcSite, phrases, id, customFields) {
  const { _id: key = index, type, content } = item

  const {
    hideImageTitle = false,
    hideImageCaption = false,
    hideImageCredits = false,
    // hideGalleryTitle = false,
    // hideGalleryCaption = false,
    // hideGalleryCredits = false,
    hideVideoTitle = false,
    hideVideoCaption = false,
    hideVideoCredits = false,
  } = customFields

  // This is up here to prevent a lexical declaration in a case block (which throws an error). It goes with the "video" case
  let videoAspectRatio = '16:9' // Default to 16:9

  switch (type) {
    case 'text': {
      return content && content.length > 0 ? (
        <Text key={`${type}_${index}_${key}`} as="div" fontSize="xs" fontWeight="normal">
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </Text>
      ) : null
    }
    case 'copyright': {
      return content && content.length > 0 ? (
        <Paragraph
          key={`${type}_${index}_${key}`}
          className={`${BLOCK_CLASS_NAME}__copyright`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : null
    }

    case 'divider': {
      return <Divider assistiveHidden={false} key={`${type}_${index}_${key}`} />
    }

    case 'image': {
      const {
        additional_properties: { link = '' } = {},
        // alignment not always present
        alignment = '',
        alt_text: altText,
        caption,
        credits,
        subtitle,
        url,
        vanity_credits: vanityCredits,
      } = item

      // only left and right float supported
      const allowedFloatValue = alignment === 'left' || alignment === 'right' ? alignment : ''
      const figureImageClassName = `${BLOCK_CLASS_NAME}__image${
        allowedFloatValue ? ` ${BLOCK_CLASS_NAME}__image-float-${allowedFloatValue}` : ''
      }`

      if (url) {
        const formattedCredits = formatCredits(vanityCredits || credits)
        return (
          <MediaItem
            key={`${type}_${index}_${key}`}
            className={figureImageClassName}
            caption={!hideImageCaption ? caption : null}
            credit={!hideImageCredits ? formattedCredits : null}
            title={!hideImageTitle ? subtitle : null}
          >
            <Conditional component={Link} condition={link} href={link}>
              <Image
                {...getResizeParamsFromANSImage(
                  item,
                  arcSite,
                  // allowedFloatValue ? 400 : 800,
                  item.width,
                  [390, 460, 660, 770].map(w => (allowedFloatValue ? w / 2 : w)),
                )}
                alt={altText}
              />
            </Conditional>
          </MediaItem>
        )
      }
      return null
    }

    case 'interstitial_link': {
      const { url } = item
      // link string will have to be truthy (non-zero length string) to render below
      if (!(url && content)) return null
      const beforeContent = '[&nbsp;'
      const afterContent = '&nbsp;]'

      return (
        <Paragraph
          key={`${type}_${index}_${key}`}
          className={`${BLOCK_CLASS_NAME}__interstitial-link`}
        >
          <span dangerouslySetInnerHTML={{ __html: beforeContent }} />
          <Link
            href={url}
            aria-label={phrases.t('article-body-block.interstitial-link-aria-label')}
          >
            {content}
          </Link>
          <span dangerouslySetInnerHTML={{ __html: afterContent }} />
        </Paragraph>
      )
    }

    case 'raw_html': {
      return content && content.length > 0 ? (
        <HTML
          key={`${type}_${index}_${key}`}
          id={key}
          className={`${BLOCK_CLASS_NAME}__html`}
          content={content}
        />
      ) : null
    }

    case 'list': {
      const { _id: listId = '', list_type: listType, items: listItems } = item
      // eslint-disable-next-line arrow-body-style
      return listItems && listItems.length > 0 ? (
        <List key={`${type}_${index}_${listId}_${key}`} listType={listType} listItems={listItems} />
      ) : null
    }

    case 'link_list': {
      return (
        <LinkList key={`${type}_${index}_${key}`} classPrefix={BLOCK_CLASS_NAME} element={item} />
      )
    }

    case 'correction': {
      // can either be clarification or correction
      const { correction_type: labelType } = item
      const labelText =
        labelType === 'clarification'
          ? phrases.t('article-body-block.clarification')
          : phrases.t('article-body-block.correction')

      return item.text && item.text.length > 0 ? (
        <section className={`${BLOCK_CLASS_NAME}__correction`} key={`${type}_${index}_${key}`}>
          <HeadingSection>
            <Heading>{labelText}</Heading>
            <Paragraph>{item.text}</Paragraph>
          </HeadingSection>
        </section>
      ) : null
    }

    case 'header':
      return item.content && item.content.length > 0 ? (
        <Header key={`${type}_${index}_${key}`} classPrefix={BLOCK_CLASS_NAME} element={item} />
      ) : null

    case 'oembed_response': {
      return item.raw_oembed ? (
        <Oembed key={`${type}_${index}_${key}`} classPrefix={BLOCK_CLASS_NAME} element={item} />
      ) : null
    }

    case 'custom_embed': {
      return item.embed ? (
        <CustomEmbed key={item.embed.id} classPrefix={BLOCK_CLASS_NAME} element={item} />
      ) : null
    }

    case 'table': {
      return item.rows ? (
        <Table key={`${type}_${index}_${key}`} element={item} classPrefix={BLOCK_CLASS_NAME} />
      ) : null
    }

    case 'quote':
      return <Quote key={`${type}_${index}_${key}`} element={item} classPrefix={BLOCK_CLASS_NAME} />

    case 'video':
      // Calculate the aspect ratio for the item. If the item doesn't have any promo items, then 16:9 is used as a fallback
      if (item && item.promo_items && item.promo_items.basic) {
        // Get the width and height of the promo item and calculate the aspect ratio
        const width = item?.promo_items.basic.width
        const height = item?.promo_items.basic.height

        // Assign the calculated value to aspectRatio if it is non-null, otherwise assign default 16:9
        videoAspectRatio = getAspectRatio(width, height) || '16:9'
      }

      return (
        <MediaItem
          key={`${type}_${index}_${key}`}
          caption={!hideVideoCaption ? item?.description?.basic : null}
          credit={!hideVideoCredits ? formatCredits(item.credits) : null}
          title={!hideVideoTitle ? item?.headlines?.basic : null}
        >
          <Video
            aspectRatio={videoAspectRatio}
            className="video-container"
            embedMarkup={item.embed_html}
          />
        </MediaItem>
      )
    case 'gallery': {
      return item.content_elements.length ? (
        <Gallery
          key={`${type}_${index}_${key}`}
          element={item}
          classPrefix={`${BLOCK_CLASS_NAME}-gallery`}
        />
      ) : null
    }
    default:
      return null
  }
}

function parsePromoItem(item, itemKey, arcSite, customFields) {
  if (item.type === 'image') {
    const {
      hideImageTitle = false,
      hideImageCaption = false,
      hideImageCredits = false,
    } = customFields

    const [width, height] = itemKey.split('x').map(str => Number(str))
    let allowedFloatValue = ''
    if (width < IMAGE_FULLWIDTH_FORMAT) {
      allowedFloatValue = 'left'
    }

    const {
      _id,
      additional_properties: { link = '' } = {},
      alt_text: altText,
      caption,
      credits,
      subtitle,
      url,
      vanity_credits: vanityCredits,
    } = item

    if (url) {
      console.log()
      const formattedCredits = formatCredits(vanityCredits || credits)
      return (
        <MediaItem
          key={`${_id}_${itemKey}`}
          className={`${BLOCK_CLASS_NAME}__image promo-image ${allowedFloatValue ? 'float' : ''}`}
          caption={!hideImageCaption ? caption : null}
          credit={!hideImageCredits ? formattedCredits : null}
          title={!hideImageTitle ? subtitle : null}
        >
          <Conditional component={Link} condition={link} href={link}>
            <div
              className={`${BLOCK_CLASS_NAME}__image-wrapper`}
              style={{
                width: width,
                height: height,
              }}
            >
              <Image
                {...getResizeParamsFromANSImage(
                  item,
                  arcSite,
                  item.width,
                  [390, 460, 660, 770].map(w => (allowedFloatValue ? w / 2 : w)),
                )}
                alt={altText}
              />
            </div>
          </Conditional>
        </MediaItem>
      )
    }
  }
  return null
}

export const ArticleBodyChainPresentation = ({ children, customFields = {}, context }) => {
  const { globalContent: items = {}, arcSite, id } = context
  const {
    content_elements: contentElements = [],
    copyright,
    location,
    promo_items: promoItems = {},
  } = items
  const { elementPlacement: adPlacementConfigObj = {} } = customFields
  const phrases = usePhrases()

  const adPlacements = Object.keys(adPlacementConfigObj).map(key => ({
    feature: +key,
    paragraph: +adPlacementConfigObj[key],
  }))

  const paragraphTotal = contentElements.filter(element => element.type === 'text').length

  let paragraphCounter = 0
  const articleBody = [
    ...Object.keys(promoItems).map(promoItemKey =>
      parsePromoItem(promoItems[promoItemKey], promoItemKey, arcSite, customFields),
    ),
    ...contentElements.map((contentElement, index) => {
      if (contentElement.type === 'text') {
        // Start at 1 since the ad configs use one-based array indexes
        paragraphCounter += 1

        const adsAfterParagraph = adPlacements.filter(
          placement => placement.paragraph === paragraphCounter,
        )

        if (
          paragraphCounter === 1 &&
          location &&
          contentElement.content.indexOf(`${location} &mdash;`) !== 0
        ) {
          // eslint-disable-next-line no-param-reassign
          contentElement.content = `${location} &mdash; ${contentElement.content}`
        }

        // The ad features should follow the content element if they exist, but not if
        // the current paragraph is the last or second-to-last paragraph.
        if (adsAfterParagraph.length && paragraphCounter < paragraphTotal - 1) {
          return [
            parseArticleItem(contentElement, index, arcSite, phrases, id, customFields),
            ...adsAfterParagraph.map(placement => children[placement.feature - 1]),
          ]
        }
      }

      return parseArticleItem(contentElement, index, arcSite, phrases, id, customFields)
    }),
    ...(copyright
      ? [
          parseArticleItem(
            {
              type: 'copyright',
              content: copyright,
            },
            'copyright-text',
            arcSite,
            null, // phrases not used by text type
            null, // id not used by text type
            {}, // customFields only used in video
          ),
        ]
      : []),
  ]
  return <article className={BLOCK_CLASS_NAME}>{articleBody}</article>
}

const ArticleBodyChain = ({ children, customFields = {} }) => {
  const context = useFusionContext()
  const { isAdmin } = context
  if (customFields?.lazyLoad && isServerSide() && !isAdmin) {
    // On Server
    return null
  }
  return (
    <LazyLoad enabled={customFields?.lazyLoad && !isAdmin}>
      <ArticleBodyChainPresentation context={context} customFields={customFields}>
        {children}
      </ArticleBodyChainPresentation>
    </LazyLoad>
  )
}

ArticleBodyChain.propTypes = {
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
      description: 'This display option applies to all Images in the Article Body.',
      label: 'Hide Title',
      defaultValue: false,
      group: 'Image Display Options',
    }),
    hideImageCaption: PropTypes.bool.tag({
      description: 'This display option applies to all Images in the Article Body.',
      label: 'Hide Caption',
      defaultValue: false,
      group: 'Image Display Options',
    }),
    hideImageCredits: PropTypes.bool.tag({
      description: 'This display option applies to all Images in the Article Body.',
      label: 'Hide Credits',
      defaultValue: false,
      group: 'Image Display Options',
    }),
    hideGalleryTitle: PropTypes.bool.tag({
      description: 'This display option applies to all Galleries in the Article Body',
      label: 'Hide Title',
      defaultValue: false,
      group: 'Gallery Display Options',
    }),
    hideGalleryCaption: PropTypes.bool.tag({
      description: 'This display option applies to all Galleries in the Article Body',
      label: 'Hide Caption',
      defaultValue: false,
      group: 'Gallery Display Options',
    }),
    hideGalleryCredits: PropTypes.bool.tag({
      description: 'This display option applies to all Galleries in the Article Body',
      label: 'Hide Credits',
      defaultValue: false,
      group: 'Gallery Display Options',
    }),
    hideVideoTitle: PropTypes.bool.tag({
      description: 'This display option applies to all Videos in the Article Body',
      label: 'Hide Title',
      defaultValue: false,
      group: 'Video Display Options',
    }),
    hideVideoCaption: PropTypes.bool.tag({
      description: 'This display option applies to all Videos in the Article Body',
      label: 'Hide Caption',
      defaultValue: false,
      group: 'Video Display Options',
    }),
    hideVideoCredits: PropTypes.bool.tag({
      description: 'This display option applies to all Videos in the Article Body',
      label: 'Hide Credits',
      defaultValue: false,
      group: 'Video Display Options',
    }),
  }),
}

ArticleBodyChain.label = 'Article Body – R7 Block'

ArticleBodyChain.icon = 'arc-article'

export default ArticleBodyChain
