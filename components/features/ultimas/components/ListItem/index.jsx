import React, { useEffect, Fragment } from 'react'
import { useContent } from 'fusion:content'
import { getImageFromANS, Image } from '@wpmedia/arc-themes-components'
import { formatDate } from '../../util/formatDate'
import { ConditionalLink, Paragraph } from '@r7/ui-base-components'
import { TaboolaCard } from '../Taboola'

export const UltimasListItem = ({
  className,
  arcSite,
  customFields,
  size,
  sectionId,
  setIsDisabled,
  setIsLoading,
  isAdmin,
  websiteName,
}) => {
  const { content_elements } =
    useContent({
      source: customFields.listContentConfig.contentService,
      query: {
        includeSections: sectionId,
        feedOffset: customFields.listContentConfig.contentConfigValues.feedOffset,
        feedSize: size,
      },
    }) || {}

  useEffect(() => {
    setIsLoading(false)
    if (content_elements && content_elements.length < size) {
      setIsDisabled(true)
    }
  }, [content_elements])

  // const contentElementsStory = content_elements?.filter(item => item._id !== storyId)
  const shouldRenderTaboola = idx => {
    if (!customFields.enableTaboola || idx === 0) return false

    return idx % (customFields.positionTaboolaCard - 1) === 0
  }

  if (!content_elements) {
    return null
  }
  return (
    <section className={`${className}__items`}>
      {content_elements.map((element, idx) => {
        const {
          headlines: { basic: headlineText = '' } = {},
          websites,
          credits,
          publish_date,
        } = element
        const image = getImageFromANS(element)

        if (!websites) return null

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
          <Fragment key={`simple-list-${element._id}`}>
            {shouldRenderTaboola(idx) && (
              <TaboolaCard
                customFields={customFields}
                websiteName={websiteName}
                isAdmin={isAdmin}
                className={className}
                id={element._id}
              />
            )}
            <article data-observerid={idx} className={`${className}__item`}>
              <div className={`${className}__item-author`}>
                <ConditionalLink href={url}>
                  <span>
                    {credits?.by && credits?.by[0] ? `${credits?.by[0]?.name} / ` : ''}{' '}
                    {formatDate(publish_date)}
                  </span>
                </ConditionalLink>
              </div>
              <div className={`${className}__item-content`}>
                <div className={`${className}__item-content-img`}>
                  {imageParams ? (
                    <figure>
                      <ConditionalLink href={url} assistiveHidden>
                        <Image {...imageParams} />
                      </ConditionalLink>
                    </figure>
                  ) : null}
                </div>
                <ConditionalLink href={url} title={headlineText}>
                  <Paragraph as="h3">{headlineText}</Paragraph>
                </ConditionalLink>
              </div>
            </article>
          </Fragment>
        )
      })}
    </section>
  )
}
