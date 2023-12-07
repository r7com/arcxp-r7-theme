import React from 'react'
import { useContent } from 'fusion:content'
import { Conditional, formatCredits, Image, Link, MediaItem } from '@wpmedia/arc-themes-components'
import { IMAGE_FULLWIDTH_FORMAT } from '../../../../constants'
import getResizeParamsFromANSImage from '../../../../../../../util/get-resize-params-from-ans-image'

export const FormattedImage = ({ customFields, item, className, arcSite }) => {
  const {
    hideImageTitle = false,
    hideImageCaption = false,
    hideImageCredits = false,
  } = customFields

  const imageDimensions = {
    width: '100%',
    height: '100%',
  }
  if (item.config?.imageFormat !== 'full') {
    const [width, height] = item.config?.imageFormat.split('x').map(str => Number(str))
    imageDimensions.width = width
    imageDimensions.height = height
  }

  let allowedFloatValue = ''
  if (imageDimensions.width < IMAGE_FULLWIDTH_FORMAT) {
    allowedFloatValue = 'left'
  }

  const imageAnsData = useContent({
    source: 'photo-api',
    query: { _id: item.config?.imageId },
  })

  if (imageAnsData) {
    const {
      _id,
      additional_properties: { link = '' } = {},
      alt_text: altText,
      caption,
      credits,
      subtitle,
      vanity_credits: vanityCredits,
    } = imageAnsData

    const formattedCredits = formatCredits(vanityCredits || credits)
    return (
      <MediaItem
        key={`${_id}_${item.id}`}
        className={`${className}__image promo-image ${allowedFloatValue ? 'float' : ''}`}
        caption={!hideImageCaption ? caption : null}
        credit={!hideImageCredits ? formattedCredits : null}
        title={!hideImageTitle ? subtitle : null}
      >
        <Conditional component={Link} condition={link} href={link}>
          <div
            className={`${className}__image-wrapper`}
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

  return null
}
