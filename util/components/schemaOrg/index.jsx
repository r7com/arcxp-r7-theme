import React from 'react'
import PropTypes from 'prop-types'
import { useSiteSectionProp } from '../../useSiteTopperProp'
import convertMillisecondsToISO8601Duration from './util/durationToIso'
const SECTION_NAME = 'navigation.nav_title'

export default function CustomSchemaOrg({
  globalContent,
  globalContentConfig,
  websiteDomain,
  metaValue,
  websiteName,
  facebookPage,
  twitterUsername,
  instagramPage,
  youtubePage = 'https://youtube.com/r7',
  linkedInPage = 'https://www.linkedin.com/company/r7-com/mycompany/',
}) {
  const pageType = metaValue('page-type')
  switch (pageType) {
    case 'home-page': {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'R7.com',
        alternateName: 'Portal R7',
        description:
          'O R7 é um dos maiores portais do Brasil. Foi criado em 2009 e pertence ao Grupo Record. Oferece jornalismo e entretenimento a milhões de usuários, tanto na web como nas redes sociais, incluindo conteúdo da Record TV e Record News.',
        url: 'https://www.r7.com/',
        sameAs: [facebookPage, twitterUsername, linkedInPage, instagramPage, youtubePage],
        logo: {
          '@type': 'ImageObject',
          url: 'https://sc.r7.com/amp/search-logo.png',
          width: 151,
          height: 151,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Rua da Bosque, 1449 - Barra Funda',
          addressLocality: 'São Paulo',
          addressRegion: 'SP',
          postalCode: '01140-080',
          addressCountry: 'Brasil',
        },
      }
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )
    }
    case 'section': {
      const sections = globalContentConfig?.query?.includeSections || ''
      const splitSctions = sections.split('/').filter(el => !!el)
      const sectionIds = splitSctions.map(
        (element, index) => '/' + splitSctions.slice(0, index + 1).join('/'),
      )
      const sectionNames = sectionIds.map(el => {
        return {
          id: el,
          name: useSiteSectionProp(SECTION_NAME, el),
        }
      })
      const structuredData = {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': websiteDomain,
              name: websiteName,
            },
          },
        ],
      }
      sectionNames.forEach((el, idx) => {
        structuredData.itemListElement.push({
          '@type': 'ListItem',
          position: idx + 2,
          item: {
            name: el.name,
            '@id': `${websiteDomain}${el.id}`,
          },
        })
      })
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )
    }
    case 'gallery':
    case 'article': {
      if (!globalContent) return null

      const {
        promo_items,
        publish_date,
        headlines,
        canonical_url,
        last_updated_date,
        description,
        subheadlines,
        canonical_website,
      } = globalContent
      const structuredDataArray = []
      const findVideoElement = globalContent.content_elements.find(el => el.type === 'video')
      const sections = globalContent?.taxonomy?.sections || []

      const findAllImages = globalContent.content_elements.filter(el => el.type === 'image')

      const articleStructuredData = {
        '@context': 'http://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': websiteDomain + canonical_url,
        },
        headline: headlines.basic,
        description: description.basic || subheadlines.basic,
        url: websiteDomain + canonical_url,
        image:
          pageType === 'gallery' && findAllImages
            ? findAllImages.map(el => ({
                '@type': 'ImageObject',
                width: el.width,
                height: el.height,
                url: el.url,
              }))
            : {
                '@type': 'ImageObject',
                width: promo_items.basic.width,
                height: promo_items.basic.height,
                url: promo_items.basic.url,
              },
        datePublished: publish_date,
        dateModified: last_updated_date,
        author: {
          '@type': 'Organization',
          name: 'R7.com',
          url: 'https://www.r7.com/',
          sameAs: [facebookPage, twitterUsername, linkedInPage, instagramPage, youtubePage],
          logo: {
            '@type': 'ImageObject',
            url: 'https://sc.r7.com/amp/search-logo.png',
            width: 100,
            height: 60,
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'R7.com',
          url: 'https://www.r7.com/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://sc.r7.com/amp/search-logo.png',
            width: 100,
            height: 60,
          },
        },
      }
      structuredDataArray.push(
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />,
      )
      if (sections.length) {
        const sectionNames = sections
          .filter(el => el._website === canonical_website)
          .map(el => {
            return {
              id: el.path,
              name: el.name,
            }
          })
        const breadCrumbsStructuredData = {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': websiteDomain,
                name: websiteName,
              },
            },
          ],
        }
        ;(pageType === 'gallery' ? sectionNames : sectionNames.reverse()).forEach((el, idx) => {
          breadCrumbsStructuredData.itemListElement.push({
            '@type': 'ListItem',
            position: idx + 2,
            item: {
              name: el.name,
              '@id': `${websiteDomain}${el.id}`,
            },
          })
        })
        structuredDataArray.push(
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadCrumbsStructuredData) }}
          />,
        )
      }
      if (findVideoElement) {
        const { promo_image } = findVideoElement
        const duration = convertMillisecondsToISO8601Duration(findVideoElement.duration)
        const videoStructuredData = {
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: headlines.basic,
          description: description.basic || subheadlines.basic,
          duration,
          width: promo_image.width,
          height: promo_image.height,
          thumbnailUrl: promo_image.url,
          uploadDate: publish_date,
          contentUrl: '',
          embedUrl: '',
          potentialAction: {
            '@type': 'SeekToAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: websiteDomain + canonical_url + `?t={seek_to_second_number}`,
            },
            'startOffset-input': {
              '@type': 'PropertyValueSpecification',
              valueRequired: 'http://schema.org/True',
              valueName: 'seek_to_second_number',
            },
          },
        }
        structuredDataArray.push(
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
          />,
        )
      }

      return structuredDataArray
    }
    default:
      return null
  }
}

CustomSchemaOrg.propTypes = {
  arcSite: PropTypes.string,
  canonicalDomain: PropTypes.string,
  facebookAdmins: PropTypes.string,
  fallbackImage: PropTypes.string,
  globalContent: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.shape({
      basic: PropTypes.string,
    }),
    headlines: PropTypes.shape({
      basic: PropTypes.string,
    }),
    taxonomy: PropTypes.shape({
      seo_keywords: PropTypes.array,
      tags: PropTypes.array,
    }),
    authors: PropTypes.array,
    Payload: PropTypes.array,
    metadata: PropTypes.shape({
      metadata_description: PropTypes.string,
      metadata_title: PropTypes.string,
    }),
    canonical_url: PropTypes.string,
  }),
  globalContentConfig: PropTypes.shape({
    query: PropTypes.shape({
      uri: PropTypes.string,
    }),
  }),
  metaValue: PropTypes.func,
  twitterUsername: PropTypes.string,
  websiteDomain: PropTypes.string,
  websiteName: PropTypes.string,
}
