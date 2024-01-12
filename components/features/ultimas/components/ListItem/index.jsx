import React, { useEffect, Fragment } from 'react'
import { useContent } from 'fusion:content'
import { getImageFromANS, Image, Link } from '@wpmedia/arc-themes-components'
import { formatDate } from '../../util/formatDate'
import { Paragraph } from '@r7/ui-base-components'

let posNative

export const UltimasListItem = ({
  className,
  arcSite,
  customFields,
  size,
  storyId,
  setIsDisabled,
  setIsLoading,
  isAdmin,
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
  }, [content_elements, customFields.positionTaboolaCard])

  useEffect(() => {
    posNative = customFields.positionTaboolaCard
  }, [])

  const posNativeOriginal = customFields.positionTaboolaCard - 1
  console.log(customFields)

  const RenderTaboolaCard = ({ index }) => {
    if (posNative === index + 1) {
      const counter = Math.ceil(Math.random() * 100000000)
      // TODO: Logica para Home r7
      const ENV = {
        placement: '',
        container: '',
      }

      const taboolaConfig = {
        mode: 'thumbnails-1x1-mid-article',
        container: `taboola-ultimas-noticias-widget-organico${ENV.container}-${counter}`,
        placement: `Ultimas noticias widget organico${ENV.placement} - ${counter}`,
        target_type: 'mix',
      }

      posNative += posNativeOriginal
      // TODO: Logica para Home r7
      taboolaConfig.homepage = 'auto'

      if (!isAdmin) {
        window._taboola = window._taboola || []
        window._taboola.push(taboolaConfig)
      }

      return (
        <div
          data-observerid={index}
          className={`${className}__item`}
          id={`taboola-ultimas-noticias-widget-organico${ENV.container}-${counter}`}
        >
          {isAdmin ? 'Taboola Card' : ''}
        </div>
      )
    }

    return null
  }

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
          <Fragment key={`simple-list-${element._id}`}>
            {customFields.enableTaboola && <RenderTaboolaCard index={idx} />}
            <article data-observerid={idx} className={`${className}__item`}>
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
          </Fragment>
        )
      })}
    </section>
  )
}
