import './default.scss'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import { SocialShare, useArticleAction } from '@r7/ui-article-delivery'
import { Paragraph, Typography } from '@r7/ui-base-components'
import getProperties from 'fusion:properties'

import {
  Divider,
  Heading,
  HeadingSection,
  isServerSide,
  LazyLoad,
  Link,
  usePhrases,
} from '@wpmedia/arc-themes-components'

import Gallery from './_children/gallery'
import LinkList from './_children/link-list'
import Quote from './_children/quote'
import CustomEmbed from './_children/custom-embed'
import Table from './_children/table'
import Oembed from './_children/oembed'
import List from './_children/list'
import HTML from './_children/html'
import Header from './_children/heading'

import { AccessibilityBar } from './_children/accessibility-bar'
import { Image } from '../../../util/components/Image'
import { R7Player } from '../../../util/components/Player'
import { getPlayerDataProxy } from '../../../util/components/Player/proxy/proxy'

const BLOCK_CLASS_NAME = 'b-article-body'

function parseArticleItem(item, index, phrases, customFields) {
  const { _id: key = index, type, content } = item

  switch (type) {
    case 'text': {
      return content && content.length > 0 ? (
        <Paragraph key={`${type}_${index}_${key}`} fontSize="xs" dangerHTML={content} />
      ) : null
    }
    case 'copyright': {
      return content && content.length > 0 ? (
        <Typography
          key={`${type}_${index}_${key}`}
          className={`${BLOCK_CLASS_NAME}__copyright`}
          dangerHTML={content}
        />
      ) : null
    }

    case 'divider': {
      return <Divider assistiveHidden={false} key={`${type}_${index}_${key}`} />
    }

    case 'image': {
      const { alignment = '' } = item
      const allowedFloatValue = alignment === 'left' || alignment === 'right' ? alignment : ''
      const figureImageClassName = `${BLOCK_CLASS_NAME}__image${
        allowedFloatValue ? ` ${BLOCK_CLASS_NAME}__image-float-${allowedFloatValue}` : ''
      }`

      return (
        <Image
          key={`${type}_${index}_${key}`}
          item={item}
          customFields={customFields}
          className={figureImageClassName}
        />
      )
    }

    case 'interstitial_link': {
      const { url } = item
      // link string will have to be truthy (non-zero length string) to render below
      if (!(url && content)) return null
      const beforeContent = '[&nbsp;'
      const afterContent = '&nbsp;]'

      return (
        <Typography
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
        </Typography>
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
            <Typography>{item.text}</Typography>
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
        <CustomEmbed
          key={item.embed.id}
          classPrefix={BLOCK_CLASS_NAME}
          element={item}
          customFields={customFields}
        />
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
      return <R7Player key={item._id} item={getPlayerDataProxy(item)} />

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

export const ArticleBodyChainPresentation = ({ children, customFields = {}, context }) => {
  const { globalContent: items = {}, arcSite, id } = context
  const { fontSize } = useArticleAction()
  const { content_elements: contentElements = [], copyright, location, website_url } = items
  const { elementPlacement: adPlacementConfigObj = {} } = customFields
  const phrases = usePhrases()
  const { websiteDomain } = getProperties(arcSite)
  const urlForShare = encodeURI(`${websiteDomain}${website_url}`)

  const adPlacements = Object.keys(adPlacementConfigObj).map(key => ({
    feature: +key,
    paragraph: +adPlacementConfigObj[key],
  }))

  const paragraphTotal = contentElements.filter(element => element.type === 'text').length

  let paragraphCounter = 0

  const articleBody = [
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

  return (
    <article className={BLOCK_CLASS_NAME} style={{ '--font-size': `${fontSize}` }}>
      <AccessibilityBar />
      {articleBody}
      <div className="social-share">
        <SocialShare>
          <SocialShare.List>
            <SocialShare.Item
              name="googleNews"
              link={urlForShare}
              title="google-news"
              position="rodape-article"
            />
            <SocialShare.Item
              name="facebook"
              link={urlForShare}
              title="facebook"
              position="rodape-article"
            />
            <SocialShare.Item
              name="twitter"
              link={urlForShare}
              title="twitter"
              position="rodape-article"
            />
            <SocialShare.Item
              name="whatsapp"
              link={urlForShare}
              title="whatsapp"
              position="rodape-article"
            />
            <SocialShare.Item
              name="linkedin"
              link={urlForShare}
              title="linkedin"
              position="rodape-article"
            />
            <SocialShare.Item
              name="share"
              link={urlForShare}
              title="share"
              position="rodape-article"
            />
          </SocialShare.List>
        </SocialShare>
      </div>
    </article>
  )
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
