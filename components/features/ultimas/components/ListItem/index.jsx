import React, { useEffect } from 'react'
import { useContent } from 'fusion:content'
import { getImageFromANS, Image, Link } from '@wpmedia/arc-themes-components'
import { formatDate } from '../../../ultimas-list/util/formatDate'
import { Paragraph } from '@r7/ui-base-components'

export const UltimasListItem = ({
  className,
  arcSite,
  customFields,
  size,
  storyId,
  setIsDisabled,
  setIsLoading,
}) => {
  const { content_elements } =
    useContent({
      source: customFields.listContentConfig.contentService,
      query: {
        ...{
          ...customFields.listContentConfig.contentConfigValues,
          feedSize: size,
        },
      },
    }) || {}

  useEffect(() => {
    setIsLoading(false)
    if (content_elements && content_elements.length < size) {
      setIsDisabled(true)
    }
  }, [content_elements])

  const contentElementsStory = content_elements?.filter(item => item._id !== storyId)
  if (!contentElementsStory) {
    return null
  }
  return (
    <section className={`${className}__items`}>
      {contentElementsStory.map((element, idx) => {
        const {
          headlines: { basic: headlineText = '' } = {},
          websites,
          credits,
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
              aspectRatio: '16:9',
              resizedOptions: {
                smart: true,
              },
              responsiveImages: [160],
              width: 160,
            }
          : null
        return (
          <article
            data-observerid={idx}
            className={`${className}__item`}
            key={`simple-list-${element._id}`}
          >
            <div className={`${className}__item-author`}>
              <Link href={url}>
                <span>
                  {credits?.by && credits?.by[0] ? `${credits?.by[0]?.name} / ` : ''}{' '}
                  {formatDate(publish_date)}
                </span>
              </Link>
            </div>
            <div className={`${className}__item-content`}>
              <div className={`${className}__item-content-img`}>
                {imageParams ? (
                  <figure>
                    <Link href={url} className={`${className}__item-anchor`} assistiveHidden>
                      <Image {...imageParams} />
                    </Link>
                  </figure>
                ) : null}
              </div>
              <Paragraph as="h3">
                <Link href={url}>{headlineText}</Link>
              </Paragraph>
            </div>
          </article>
        )
      })}
    </section>
  )
}
