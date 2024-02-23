import { AGE_RATING, AGE_RATING_DESCRIPTIONS } from '../consts/age-rating'
import { DEFAULT_PARAMS } from '../consts/default-player-params'
import { VIDEO_DATA } from '../mocks/VIDEO_DATA'
import { useContent } from 'fusion:content'

const isEmbedData = data => Object.prototype.hasOwnProperty.call(data, 'config')

const getDefaultPlayerParams = () => JSON.stringify(DEFAULT_PARAMS)

const getPlayerDataFromMock = () => VIDEO_DATA

const getBestQualityStreamHlsGlobalContent = streams => {
  const filteredHlsStreams = streams.filter(stream => stream.stream_type !== 'mp4')

  const bestQualityStream = filteredHlsStreams.reduce((maxBitrateStream, currentStream) => {
    return currentStream.bitrate > maxBitrateStream.bitrate ? currentStream : maxBitrateStream
  }, filteredHlsStreams[0])

  return bestQualityStream?.url
}

const getStreamMp4GlobalContent = streams => {
  const mp4Stream = streams.filter(stream => stream.stream_type === 'mp4')[0]

  return mp4Stream?.url
}

const getThirdSectionGlobalContent = sections => {
  return sections.length > 2 ? sections[sections.length - 1].name : ''
}

const getHostGlobalContent = data => {
  const website = data.canonical_website
  return website === 'r7' ? `${website}.com` : `${website}.r7.com`
}

const getSectionPathGlobalContent = data => {
  const host = getHostGlobalContent(data)

  return `//${host}${data.taxonomy?.primary_section?.path}`
}

const getCanonicalUrlGlobalContent = data => {
  const host = getHostGlobalContent(data)

  return `//${host}${data.canonical_url}`
}

const getAgeRatingFlag = text => {
  if (!text) {
    return ''
  }

  const ageRating = AGE_RATING.find(item => item.text === text)

  return ageRating ? ageRating.flag : ''
}

const getAgeRatingDescription = data => {
  return data
    ? Object.keys(data)
        .filter(
          key =>
            data[key] === 'true' &&
            Object.prototype.hasOwnProperty.call(AGE_RATING_DESCRIPTIONS, key),
        )
        .map(key => AGE_RATING_DESCRIPTIONS[key])
        .join(', ')
    : ''
}

const getSectionContent = (sectionId, siteId) => {
  const sectionContent = useContent({
    source: 'custom-site-service-hierarchy',
    query: { sectionId, siteId },
  })

  return sectionContent
}

const getMetadataGlobalContent = data => {
  const sectionId = data.taxonomy?.primary_section?._id
  const siteId = data.canonical_website
  const sectionContent = getSectionContent(sectionId, siteId)

  const metadata = {
    title: data.headlines?.basic,
    sectionName: data.taxonomy?.primary_section?.name ?? 'R7',
    mainSection: data.taxonomy?.primary_section?.name,
    subSection: data.taxonomy?.sections[1]?.name ?? '',
    thirdSection: getThirdSectionGlobalContent(data.taxonomy?.sections),
    views: '',
    disableAdv: 'false',
    createdDate: data.created_date,
    mainSectionUrl: getCanonicalUrlGlobalContent(data),
    sectionPath: getSectionPathGlobalContent(data),
    ageRating: getAgeRatingFlag(sectionContent?.age_rating?.classificacao_etaria),
    ageRatingDescription: getAgeRatingDescription(sectionContent?.age_rating_description),
    duration: data.duration,
  }

  return JSON.stringify(metadata)
}

const getDataFromGlobalContent = data => ({
  urlHls: getBestQualityStreamHlsGlobalContent(data.streams),
  urlMp4: getStreamMp4GlobalContent(data.streams),
  poster: data.promo_image?.url,
  metadata: getMetadataGlobalContent(data),
  playerUrl: '',
  spriteUrl: '',
  playerParams: getDefaultPlayerParams(),
})

const getDataFromCustomEmbed = data => ({
  poster: data.config.poster,
  playerUrl: '',
  metadata: JSON.stringify(data.config.metadata),
  urlHls: data.config.urlHls,
  urlMp4: data.config.urlMp4,
  playerParams: getDefaultPlayerParams(),
  spriteUrl: '',
})

const getPlayerDataProxy = data => {
  return isEmbedData(data) ? getDataFromCustomEmbed(data) : getDataFromGlobalContent(data)
}

export { getPlayerDataProxy, getPlayerDataFromMock }
