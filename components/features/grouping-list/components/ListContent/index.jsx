import React, { useEffect, useMemo } from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { getImageFromANS, Image, Link } from '@wpmedia/arc-themes-components'
import { Paragraph } from '@r7/ui-base-components'
import { Distributor } from '../../../../../util/components/Distributor'

const convertToUnix = timestamp => {
  return new Date(timestamp).getTime()
}

export const SimpleListContent = ({ className, customFields, setLoading, setDisabled, size }) => {
  const { arcSite, globalContent } = useFusionContext()
  const { content_elements } =
    useContent({
      source: 'content-feed-sections-subtypes',
      query: {
        ...{
          ...customFields.listContentConfig.contentConfigValues,
          includeSections: globalContent._id,
          feedSize: size,
        },
      },
    }) || {}
  useEffect(() => {
    setLoading(false)
    if (content_elements && content_elements.length < size) {
      setDisabled(true)
    }
  }, [content_elements])

  const sortedElements = useMemo(
    () =>
      content_elements
        .map(elem => {
          elem.lastUpdatedUnix = convertToUnix(elem.last_updated_date)
          return elem
        })
        .sort((a, b) => b.lastUpdatedUnix - a.lastUpdatedUnix),
    [content_elements],
  )
  return (
    <ul className={`${className}__items`}>
      {sortedElements.map(element => {
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
