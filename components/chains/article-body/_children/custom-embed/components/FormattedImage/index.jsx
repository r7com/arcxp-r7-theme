import React from 'react'
import { useContent } from 'fusion:content'
import { IMAGE_FORMATS } from '../../../../constants'
import { Image } from '../../../../../../../util/components/Image'

export const FormattedImage = ({ customFields, item, className }) => {
  const imageDimensions = {
    width: '100%',
  }
  if (item.config?.imageFormat !== 'full-width' && IMAGE_FORMATS[item.config?.imageFormat]) {
    imageDimensions.width = IMAGE_FORMATS[item.config?.imageFormat].width
  }

  const imageAnsData = useContent({
    source: 'photo-api',
    query: { _id: item.config?.imageId },
  })

  if (!imageAnsData) {
    return null
  }

  if (item.config?.imageFormat !== 'full-width') {
    return (
      <Image
        item={imageAnsData}
        customFields={customFields}
        className={`${className}__image promo-image ${
          IMAGE_FORMATS[item.config?.imageFormat]?.floated ? 'floated' : 'centered'
        }`}
        width={imageDimensions.width}
      />
    )
  } else {
    return (
      <Image
        item={imageAnsData}
        customFields={customFields}
        className={`${className}__image promo-image`}
      />
    )
  }
}
