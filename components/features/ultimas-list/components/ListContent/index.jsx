import React from 'react'
import { useContent } from 'fusion:content'
import { getImageFromANS, Stack, Image, Link } from '@wpmedia/arc-themes-components'
import { formatDate } from '../../util/formatDate'
import { Text } from '@r7/ui-base-components'

export const SimpleListContent = ({
  className,
  arcSite,
  size,
  contentService,
  contentConfigValues,
  targetFallbackImage,
}) => {
  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: { ...{ ...contentConfigValues, size: size }, feature: 'simple-list' },
    }) || {}
  return (
    <Stack className={`${className}__items`}>
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
          : {
              src: targetFallbackImage,
            }
        return (
          <Stack
            as="article"
            className={`${className}__item`}
            direction="horizontal"
            key={`simple-list-${element._id}`}
          >
            <Link href={url} className={`${className}__item-anchor`} assistiveHidden>
              <Image {...imageParams} />
            </Link>
            <div className={`${className}__item-content`}>
              <Text as="span" fontSize="little" style={{ textTransform: 'uppercase' }}>
                <Link href={url}>{credits.by[0] ? `${credits.by[0]?.name} / ` : ''}</Link>
                {formatDate(publish_date)}
              </Text>
              <Text as="h3" fontSize="md" fontWeight="semibold">
                <Link href={url}>{headlineText}</Link>
              </Text>
              <Text as="p" fontSize="xxxs">
                {subheadlineText}
              </Text>
            </div>
          </Stack>
        )
      })}
    </Stack>
  )
}
