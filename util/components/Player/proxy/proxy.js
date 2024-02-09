import { DEFAULT_PARAMS } from '../consts/default-player-params'
import { VIDEO_DATA } from '../mocks/VIDEO_DATA'

const isEmbedData = data => Object.prototype.hasOwnProperty.call(data, 'config')

const getDefaultPlayerParams = () => JSON.stringify(DEFAULT_PARAMS)

const getPlayerDataFromMock = () => VIDEO_DATA

const getBestQualityStreamHlsGlobalContent = streams => {
  const filteredHlsStreams = streams.filter(stream => stream.stream_type !== 'mp4')

  const bestQualityStream = filteredHlsStreams.reduce((maxBitrateStream, currentStream) => {
    return currentStream.bitrate > maxBitrateStream.bitrate ? currentStream : maxBitrateStream
  }, filteredHlsStreams[0])

  return bestQualityStream.url
}

const getStreamMp4GlobalContent = streams => {
  const mp4Stream = streams.filter(stream => stream.stream_type === 'mp4')[0]

  return mp4Stream?.url
}

const getSubSectionGlobalContent = sections => {
  return sections.length > 1 ? sections[1] : ''
}

const getThirdSectionGlobalContent = sections => {
  return sections.length > 2 ? sections[sections.length - 1] : ''
}

const getSectionPathGlobalContent = sectionUrl => {
  const defaultPath = 'https://www.r7.com'
  const slashCount = sectionUrl.split('/').length - 1

  if (slashCount >= 3) {
    const pathRegex = /^\/\/[^/]+\/([^/]+)/g
    return sectionUrl.match(pathRegex)[0]
  }

  return defaultPath
}

const getCanonicalUrlGlobalContent = data => {
  const website = data.canonical_website
  const host = website === 'r7' ? `${website}.com` : `${website}.r7.com`

  return `//${host}${data.canonical_url}`
}

const getSectionInfoGlobalContent = data => {
  const sectionUrl = getCanonicalUrlGlobalContent(data)
  const sectionPath = getSectionPathGlobalContent(sectionUrl)

  return {
    url: sectionUrl,
    path: sectionPath,
  }
}

const getMetadataGlobalContent = data => {
  const sectionInfo = getSectionInfoGlobalContent(data)

  const metadata = {
    title: data.headlines?.basic,
    sectionName: data.taxonomy?.primary_section?.name,
    subSection: getSubSectionGlobalContent(data.taxonomy?.sections),
    thirdSection: getThirdSectionGlobalContent(data.taxonomy?.sections),
    views: '',
    disableAdv: 'false',
    createdDate: data.created_date,
    mainSectionUrl: sectionInfo.url,
    sectionPath: sectionInfo.path,
    ageRating: '',
    ageRatingDescription: '',
    duration: data.duration,
  }

  return JSON.stringify(metadata)
}

const getDataFromGlobalContent = data => {
  const proxyDataFromGlobalContent = {}

  proxyDataFromGlobalContent.urlHls = getBestQualityStreamHlsGlobalContent(data.streams)
  proxyDataFromGlobalContent.urlMp4 = getStreamMp4GlobalContent(data.streams)
  proxyDataFromGlobalContent.poster = data.promo_image?.url
  proxyDataFromGlobalContent.metadata = getMetadataGlobalContent(data)
  proxyDataFromGlobalContent.playerUrl = ''
  proxyDataFromGlobalContent.spriteUrl = ''
  proxyDataFromGlobalContent.playerParams = getDefaultPlayerParams()

  return proxyDataFromGlobalContent
}

const getDataFromCustomEmbed = data => {
  const proxyDataFromCustomEmbed = {
    poster: data.config.poster,
    playerUrl: '',
    metadata: JSON.stringify(data.config.metadata),
    urlHls: data.config.urlHls,
    urlMp4: data.config.urlMp4,
    playerParams: getDefaultPlayerParams(),
    spriteUrl: '',
  }

  return proxyDataFromCustomEmbed
}

const getPlayerDataProxy = data =>
  isEmbedData(data) ? getDataFromCustomEmbed(data) : getDataFromGlobalContent(data)

export { getPlayerDataProxy, getPlayerDataFromMock }
