import { VIDEO_DATA } from '../mocks/VIDEO_DATA'

const isEmbedData = data => Object.prototype.hasOwnProperty.call(data, 'config')

const getPlayerDataFromMock = () => VIDEO_DATA

const getBestQualityStreamHlsGlobalContent = streams => {
  const filteredHlsStreams = streams.filter(stream => stream.stream_type !== 'mp4')

  const bestQualityStream = filteredHlsStreams.reduce((maxBitrateStream, currentStream) => {
    return currentStream.bitrate > maxBitrateStream.bitrate ? currentStream : maxBitrateStream
  }, filteredHlsStreams[0])

  return bestQualityStream.url
}

const getStreamMp4GlobalContent = streams => {
  return streams.filter(stream => stream.stream_type === 'mp4')
}

const getSubSectionGlobalContent = sections => {
  return sections.length > 1 ? sections[1] : ''
}

const getThirdSectionGlobalContent = sections => {
  return sections.length > 2 ? sections[sections.length - 1] : ''
}

const getMetadataGlobalContent = data => {
  const metadata = {
    title: data.headlines.basic,
    sectionName: data.taxonomy.primary_section.name,
    subSection: getSubSectionGlobalContent(data.taxonomy.sections),
    thirdSection: getThirdSectionGlobalContent(data.taxonomy.sections),
    views: '',
    disableAdv: 'false',
    createdDate: data.created_date,
    mainSectionUrl: data.canonical_url,
    sectionPath: '',
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
  proxyDataFromGlobalContent.poster = data.promo_image?.basic?.url
  proxyDataFromGlobalContent.metadata = getMetadataGlobalContent(data)
  proxyDataFromGlobalContent.playerUrl = ''
  proxyDataFromGlobalContent.spriteUrl = ''
  proxyDataFromGlobalContent.playerParams = '{}'
}

const getDataFromCustomEmbed = data => {
  const proxyDataFromCustomEmbed = {
    poster: data.config.poster,
    playerUrl: '',
    metadata: data.config.metadata,
    urlHls: data.config.urlHls,
    urlMp4: data.config.urlMp4,
    playerParams: '{}',
    spriteUrl: '',
  }

  return proxyDataFromCustomEmbed
}

const getPlayerDataProxy = data =>
  isEmbedData(data) ? getDataFromCustomEmbed(data) : getDataFromGlobalContent(data)

export { getPlayerDataProxy, getPlayerDataFromMock }
