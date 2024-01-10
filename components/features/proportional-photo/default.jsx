import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { ProportionalPhoto } from '@r7/ui-card'
import { withCard, getCardPropTypes, CardHat, CardLabel } from '../../../util/card'

const ProportionalPhotoBlock = withCard(
  props => {
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <ProportionalPhoto
        title={collection[0].headlines?.basic}
        renderHat={
          <a href={collection[0].canonical_url} title={collection[0].headlines?.basic}>
            <CardHat {...collection[0]} />
          </a>
        }
        renderImage={
          <a href={collection[0].canonical_url}>
            {collection[0].promo_items?.basic ? (
              <Image
                {...getResizeParamsFromANSImage(collection[0].promo_items?.basic, arcSite, 348, [
                  348,
                ])}
                alt={collection[0].promo_items?.basic.alt_text}
                sizes={[{ isDefault: true, sourceSizeValue: '348px' }]}
                height={199}
                resizedOptions={{
                  auth: collection[0].promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                  smart: true,
                }}
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <img
                src={fallbackImage}
                alt={fallbackImageAlt}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            )}
            <CardLabel {...collection[0]} {...collection[0].customFields.label} />
          </a>
        }
      />
    )
  },
  { defaultFrom: '0', defaultSize: '1', length: 1 },
)

ProportionalPhotoBlock.label = 'Proportional Photo - R7 Block'

ProportionalPhotoBlock.propTypes = {
  customFields: PropTypes.shape({ ...getCardPropTypes(2) }),
}

export default ProportionalPhotoBlock
