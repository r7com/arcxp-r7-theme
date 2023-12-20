/* eslint-disable no-undef */
import { adMap } from './ad-mapping'

export const getType = (globalContent = {}) => globalContent?.type

export const isContentPage = ({ globalContent } = {}) => {
  const type = getType(globalContent)
  return (type && (type === 'story' || type === 'gallery' || type === 'video')) || false
}

export const isSectionPage = ({ globalContent } = {}) =>
  (globalContent?.node_type || '') === 'section'

export const getAdName = ({ adType }) => adMap[adType]?.adName

export const getAdClass = ({ adType }) => adMap[adType]?.adClass

const convertSizesToArray = sizes => {
  const splitedSizes = sizes.trim().split(',')
  console.log({ splitedSizes })
  if (splitedSizes.length > 1) {
    return splitedSizes.map(size => size.split('x').map(Number))
  } else {
    return splitedSizes[0].split('x').map(Number)
  }
}

export const getDimensions = props => {
  console.log({ props })
  const { desktopSizes, tabletSizes, mobileSizes } = props.customFields
  const desktopArray = convertSizesToArray(desktopSizes)
  const tabletArray = convertSizesToArray(tabletSizes)
  const mobileArray = convertSizesToArray(mobileSizes)
  return [desktopArray, tabletArray, mobileArray]
}
export const getCategory = sectionPath => sectionPath && sectionPath.split('/')[1]

export const getID = ({ globalContent } = {}) => globalContent?._id

export const getTags = ({ globalContent } = {}) =>
  (globalContent?.taxonomy?.tags || [])
    .map(tagObj => tagObj?.slug || null)
    .filter(tag => tag)
    .join(',')

export const getPageType = (props = {}) => {
  const { metaValue } = props
  return (metaValue && metaValue('page-type')) || ''
}

export const getAdPath = props => {
  const { metaValue } = props
  let adPath = (metaValue && metaValue('ad-path')) || ''
  if (adPath && adPath.charAt(0) === '/') {
    adPath = adPath.substring(1)
  }
  return adPath || undefined
}

export const getPrimarySectionId = ({ globalContent, arcSite } = {}) =>
  globalContent?.websites[arcSite]?.website_section?._id || ''

export const formatSectionPath = sectionPath => {
  let fmtPath = ''
  if (sectionPath) {
    fmtPath = sectionPath
    const endIdx = fmtPath.length - 1
    if (fmtPath.charAt(endIdx) === '/') {
      fmtPath = fmtPath.substring(0, endIdx)
    }
    // remove leading slash
    if (fmtPath.charAt(0) === '/') {
      fmtPath = fmtPath.substring(1)
    }
  }
  return fmtPath
}

export const getSectionPath = props => {
  const pageType = getPageType(props)
  return pageType === 'tag' || pageType === 'author' || pageType === 'search'
    ? pageType
    : (isContentPage(props) && getPrimarySectionId(props)) ||
        (isSectionPage(props) && getID(props)) ||
        ''
}

export const getSectionID = props => formatSectionPath(getAdPath(props) || getSectionPath(props))

export const getSlotName = (props = {}) => {
  const { siteProperties } = props
  const { websiteAdPath = '' } = siteProperties || {}
  const sectionId = getSectionID(props)
  if (websiteAdPath && !sectionId) {
    return websiteAdPath
  }
  if (websiteAdPath && sectionId) {
    return `${websiteAdPath}/${sectionId}`
  }
  return sectionId
}

export const setPageTargeting = props => {
  window.googletag = window.googletag || {}
  window.googletag.cmd = window.googletag.cmd || []
  window.googletag.cmd.push(() => {
    // istanbul ignore next
    window.googletag
      .pubads()
      .setTargeting('page_type', getPageType(props))
      .setTargeting('section_id', getSectionID(props))
    // istanbul ignore next
    if (isContentPage(props)) {
      window.googletag
        .pubads()
        .setTargeting('arc_id', getID(props))
        .setTargeting('tags', getTags(props))
    }
  })
}

export const getSlotTargeting = props => ({
  ad_type: props?.adType,
})

/* Expects a 'props' object containing feature props, FusionContext */
export const getAdObject = props => {
  const { instanceId = '' } = props
  console.log(getDimensions(props))
  const adObj = {
    id: `arcad_${instanceId}`,
    slotName: '/7542/r7home/home',
    dimensions: getDimensions(props),
    sizemap: {
      breakpoints: [
        [992, 0],
        [768, 0],
        [0, 0],
      ],
      refresh: true,
    },
  }
  adObj.targeting = getSlotTargeting(adObj)
  return adObj
}
