import React, { useEffect } from 'react'
import { getImageFromANS, Image, Link } from '@wpmedia/arc-themes-components'
import { Paragraph } from '@r7/ui-base-components'
import { Distributor } from '../../../../../util/components/Distributor'
import { useCustomContent } from '../../../../../util/hooks/useCustomContent'

export const SimpleListContent = ({
  className,
  arcSite,
  customFields,
  setLoading,
  setDisabled,
  offset,
  storyId,
}) => {
  const contentElements = useCustomContent(customFields.listContentConfig, offset)
  useEffect(() => {
    setLoading(false)
    if (
      contentElements &&
      contentElements.length < offset + customFields.listContentConfig.contentConfigValues.feedSize
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [contentElements])

  const contentElementsStory = contentElements?.filter(item => item._id !== storyId)
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
