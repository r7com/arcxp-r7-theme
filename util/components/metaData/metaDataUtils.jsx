import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { URL } from 'url'

const getLocation = uri => {
  let url

  if (typeof window === 'undefined') {
    url = new URL(uri, 'http://example.com')
  } else {
    // eslint-disable-next-line
    url = document.createElement('a')
    // IE doesn't populate all link properties when setting .href with a relative URL,
    // however .href will return an absolute URL which then can be used on itself
    // to populate these additional fields.
    url.href = uri

    if (url.host === '') {
      url.href = `${url.href}`
    }
  }

  return url
}

const formatURL = item => {
  if (!item) {
    return ''
  }

  const url = getLocation(item)

  if (url.hash || url.search || url.pathname.match(/\./)) {
    return item
  }

  if (item[item.length - 1] !== '/') {
    return `${item}/`
  }

  return item
}

export const formatSrc = (srcWithResizerUrl, resizedOptions, width, height) => {
  // remove height and width from the resizedOptions
  // never use the object's heights and widths
  const {
    // eslint-disable-next-line
    height: _1,
    // eslint-disable-next-line
    width: _2,
    ...resizedOptionsNoDimensions
  } = resizedOptions

  // "https://resizer-url.com/image.jpg" + "?" + "filter=70&height=100&width=100"
  return srcWithResizerUrl.concat(
    '?',
    new URLSearchParams({
      ...resizedOptionsNoDimensions,
      // show height and width in params if available
      // using optional object key syntax
      ...(width ? { width: Math.floor(width) } : {}),
      ...(height ? { height: Math.floor(height) } : {}),
    }).toString(),
  )
}
// Use resizedOptions as querystring params on the src URL. If width and/or height are provided
// both in resizedOptions as well as function arguments, the function arguments will be used.

// returns an object
const extractImageFromPromo = promoItem =>
  promoItem?.basic?.type === 'image' && promoItem?.basic?.url ? promoItem.basic : null

/**
 * Helper to resolve an image from an story.
 *
 * @param storyObject ANS story
 *
 * @return an object with the image URL or null if ans object is not type image
 */
export const getImageFromANS = storyObject => {
  const { promo_items: promoItems } = storyObject || {}
  if (!promoItems) {
    return null
  }

  const promoImage = extractImageFromPromo(promoItems)
  if (promoImage) {
    return promoImage
  }

  if (promoItems.lead_art) {
    const leadArtPromoImage = extractImageFromPromo(promoItems.lead_art.promo_items)
    if (leadArtPromoImage) {
      return leadArtPromoImage
    }
  }

  return null
}

/**
 * Helper to take an ANS image object and return an src string
 *
 * @param data ANS Image Object
 *
 * @return an image string to be used in the src of a image tag
 */
export const imageANSToImageSrc = data => {
  const { _id: id, auth, url } = data || {}
  if (url) {
    if (id) {
      const urlParts = url.split('.')
      if (urlParts.length !== 1) {
        return `${id}.${urlParts.pop()}`
      }
    } else if (auth) {
      return encodeURIComponent(url)
    }
  }
  return null
}

const getCustomMetaData = metaHTMLString => {
  let customMetaData = null
  if (typeof window === 'undefined') {
    const DomParser = require('dom-parser')
    customMetaData = new DomParser()
      .parseFromString(metaHTMLString)
      .getElementsByTagName('META')
      .map(metaNode => ({
        metaName: metaNode.getAttribute('name'),
        metaValue: metaNode.getAttribute('value') || metaNode.getAttribute('content'),
      }))
  }
  return customMetaData
}

export const generateCustomMetaTags = (metaData, MetaTag, MetaTags) => {
  const metaHTMLString = ReactDOMServer.renderToString(<MetaTags />)
  const customMetaData = getCustomMetaData(metaHTMLString).filter(
    metaObj => !metaData[metaObj.metaName],
  )
  return (
    <>
      {customMetaData.length > 0 &&
        customMetaData.map((metaObj, i) => (
          <MetaTag
            // eslint-disable-next-line react/no-array-index-key
            key={`custom-meta-data-${i}`}
            name={metaObj.metaName}
            default={metaObj.metaValue}
          />
        ))}
    </>
  )
}

const buildUrl = (domain, path) => {
  try {
    const url = new URL(path || '', domain)
    return formatURL(url.href)
  } catch {
    return null
  }
}

const getUrlParameters = (requestUri = '') => {
  const matches = Array.from(
    requestUri.matchAll(/(?:[&?]?([\w\d%\-._~]{1:100})=([\w\d%\-._~]{1:100})){:10}?/gi),
  )
  return matches.reduce((accumulator, [, key, value]) => {
    if (accumulator[key]) {
      return {
        ...accumulator,
        [key]: [
          ...(typeof accumulator[key] === 'object' ? accumulator[key] : [accumulator[key]]),
          value,
        ],
      }
    }
    return { ...accumulator, [key]: value }
  }, {})
}

export const getPageCanonicalUrl = (pageType, domain, globalContent, requestUri) => {
  const urlParameters = getUrlParameters(requestUri)
  const authorCanonicalPath = globalContent?.authors ? globalContent?.authors[0]?.bio_page : ''
  const globalCanonicalPath = globalContent?.canonical_url
  const querylyCanonicalPath = urlParameters.query
    ? `${requestUri.replace(/\?.*/, '')}?query=${urlParameters.query}`
    : ''
  const searchCanonicalPath = globalContent?.metadata ? `search/${globalContent?.metadata.q}/` : ''
  const tagCanonicalPath = globalContent?.Payload ? `tags/${globalContent?.Payload[0]?.slug}/` : ''

  const canonicalUrlMapping = {
    article: buildUrl(domain, globalCanonicalPath),
    author: buildUrl(domain, authorCanonicalPath),
    gallery: buildUrl(domain, globalCanonicalPath),
    homepage: domain,
    'queryly-search': buildUrl(domain, querylyCanonicalPath),
    search: buildUrl(domain, searchCanonicalPath), // arc search
    section: buildUrl(domain, globalContent?._id || ''),
    tag: buildUrl(domain, tagCanonicalPath),
    video: buildUrl(domain, globalCanonicalPath),
  }
  return canonicalUrlMapping[pageType]
}

export const generateUrl = (arcSite, websiteDomain, gc) => {
  const siteData = gc && gc.websites && gc.websites[arcSite]
  if (!siteData) {
    return null
  }
  return `${websiteDomain}${siteData.website_url}`
}

export const normalizeFallbackImage = (websiteDomain, url) => {
  if (!url) {
    return null
  }
  if (!url.startsWith('http')) {
    const tmp = `${websiteDomain}¬${url}`
    return tmp.replace(/\/?¬\/?/, '/')
  }
  return url
}
