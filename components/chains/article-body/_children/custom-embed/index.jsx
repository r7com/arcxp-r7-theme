import './index.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { Conditional, formatCredits, Image, Link, MediaItem } from '@wpmedia/arc-themes-components'
import { Text } from '@r7/ui-base-components'
import { IMAGE_FULLWIDTH_FORMAT } from '../../constants'
import getResizeParamsFromANSImage from '../../../../../util/get-resize-params-from-ans-image'

const CustomEmbed = ({ element, classPrefix, customFields }) => {
  const { arcSite } = useFusionContext()
  const { primaryColor } = getProperties(arcSite)
  const { embed, subtype } = element
  const COMPONENT_CLASS_NAME = `${classPrefix}-custom-embed`
  switch (subtype) {
    case 'brief_news':
      return embed.config ? (
        <div
          className={`${COMPONENT_CLASS_NAME}-brief-news__container`}
          style={{ borderLeft: `12px solid ${primaryColor}` }}
        >
          <Text fontSize="sm" fontWeight="semibold" as="div">
            <h3
              className={`${COMPONENT_CLASS_NAME}-brief-news__title`}
              style={{ color: primaryColor }}
            >
              {embed.config.textTitle}
            </h3>
          </Text>

          <ul className={`${COMPONENT_CLASS_NAME}-brief-news__list`}>
            {embed.config.textList.map((listItem, index) => (
              <li key={`${embed.id}${index}`}>
                <Text fontSize="xxs" as="span">
                  {listItem}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      ) : null
    case 'formatted_image':
      if (embed.config) {
        const imageAnsData = JSON.parse(embed.config?.imageAnsData)
        const {
          hideImageTitle = false,
          hideImageCaption = false,
          hideImageCredits = false,
        } = customFields

        const imageDimensions = {
          width: '100%',
          height: '100%',
        }
        if (embed.config?.imageFormat !== 'full') {
          const [width, height] = embed.config?.imageFormat.split('x').map(str => Number(str))
          imageDimensions.width = width
          imageDimensions.height = height
        }

        let allowedFloatValue = ''
        if (imageDimensions.width < IMAGE_FULLWIDTH_FORMAT) {
          allowedFloatValue = 'left'
        }

        const {
          _id,
          additional_properties: { link = '' } = {},
          alt_text: altText,
          caption,
          credits,
          subtitle,
          url,
          vanity_credits: vanityCredits,
        } = imageAnsData

        if (url) {
          const formattedCredits = formatCredits(vanityCredits || credits)
          return (
            <MediaItem
              key={`${_id}_${embed.id}`}
              className={`${classPrefix}__image promo-image ${allowedFloatValue ? 'float' : ''}`}
              caption={!hideImageCaption ? caption : null}
              credit={!hideImageCredits ? formattedCredits : null}
              title={!hideImageTitle ? subtitle : null}
            >
              <Conditional component={Link} condition={link} href={link}>
                <div
                  className={`${classPrefix}__image-wrapper`}
                  style={{
                    width: imageDimensions.width,
                    height: imageDimensions.height,
                  }}
                >
                  <Image
                    {...getResizeParamsFromANSImage(
                      imageAnsData,
                      arcSite,
                      imageAnsData.width,
                      [390, 460, 660, 770].map(w => (allowedFloatValue ? w / 2 : w)),
                    )}
                    alt={altText}
                  />
                </div>
              </Conditional>
            </MediaItem>
          )
        }
      }
  }
}

export default CustomEmbed
