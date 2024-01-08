import React, { useEffect } from 'react'
import { useContent } from 'fusion:content'
import { getImageFromANS, Image, Link } from '@wpmedia/arc-themes-components'
import { Paragraph } from '@r7/ui-base-components'
import { Distributor } from '../../../../../util/components/Distributor'

export const SimpleListContent = ({
  className,
  arcSite,
  customFields,
  setLoading,
  setDisabled,
  size,
  storyId,
}) => {
  const { content_elements } =
    useContent({
      source: customFields.listContentConfig.contentService,
      query: { ...{ ...customFields.listContentConfig.contentConfigValues, feedSize: size } },
    }) || {}

  useEffect(() => {
    setLoading(false)
    if (content_elements && content_elements.length < size) {
      setDisabled(true)
    }
  }, [content_elements])

  const contentElementsStory = content_elements?.filter(item => item._id !== storyId)
  if (!contentElementsStory) {
    return null
  }
  return (
    <ul className={`${className}__items`}>
      {contentElementsStory.map(element => {
        const {
          headlines: { basic: headlineText = '' } = {},
          subheadlines: { basic: subheadlineText = '' } = {},
          websites,
          distributor,
          publish_date,
        } = element
        const image = getImageFromANS(element)

        if (!websites[arcSite]) {
          return null
        }
        const url = websites[arcSite].website_url
        const imageParams = image
          ? {
              ansImage: image,
              aspectRatio: '3:2',
              resizedOptions: {
                smart: true,
              },
              responsiveImages: [274, 548, 1096],
              width: 274,
            }
          : null
        return (
          <li className={`${className}__item`} key={`simple-list-${element._id}`}>
            {imageParams ? (
              <Link href={url} className={`${className}__item-anchor`} assistiveHidden>
                <Image {...imageParams} />
              </Link>
            ) : null}
            <div className={`${className}__item-content`}>
              <Distributor publishDate={publish_date} storyDistributor={distributor} />
              <Paragraph as="h3" fontSize="md" fontWeight="semibold">
                <Link href={url}>{headlineText}</Link>
              </Paragraph>
              {!customFields.hideCaption ? (
                <Paragraph as="p" fontSize="xxxs">
                  {subheadlineText}
                </Paragraph>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
