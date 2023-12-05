import React from 'react'
import { useContent } from 'fusion:content'
import { IMAGE_FULLWIDTH_FORMAT } from '../../../../constants'
import { Image } from '../../../../../../../util/components/Image'

export const FormattedImage = ({ customFields, item, className }) => {
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
    return (
      <Image
        item={imageAnsData}
        customFields={customFields}
        className={`${className}__image promo-image ${allowedFloatValue ? 'float' : ''}`}
        width={imageDimensions.width}
        height={imageDimensions.height}
      />
    )
  }
}
