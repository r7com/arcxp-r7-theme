import React, { useEffect } from 'react'
import { useContent } from 'fusion:content'
import { getImageFromANS, Image, Link } from '@wpmedia/arc-themes-components'
import { formatDate } from '../../util/formatDate'
import { Text } from '@r7/ui-base-components'

export const SimpleListContent = ({ className, arcSite, size, customFields, setLoading }) => {
  const { content_elements: contentElements = [] } =
    useContent({
      source: customFields.listContentConfig.contentService,
      query: { ...{ ...customFields.listContentConfig.contentConfigValues, feedSize: size } },
    }) || {}
  useEffect(() => {
    setLoading(false)
  }, [contentElements])

  return (
    <ul className={`${className}__items`}>
      {contentElements.map(element => {
        const {
          headlines: { basic: headlineText = '' } = {},
          subheadlines: { basic: subheadlineText = '' } = {},
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
              <Text as="span" fontSize="little">
                <Link href={url}>
                  {credits?.by && credits?.by[0] ? `${credits?.by[0]?.name} / ` : ''}
                </Link>
                {formatDate(publish_date)}
              </Text>
              <Text as="h3" fontSize="md" fontWeight="semibold">
                <Link href={url}>{headlineText}</Link>
              </Text>
              {!customFields.hideCaption ? (
                <Text as="p" fontSize="xxxs">
                  {subheadlineText}
                </Text>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
