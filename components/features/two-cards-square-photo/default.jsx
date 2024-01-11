import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { TwoCardsSquarePhoto } from '@r7/ui-card'
import { withCard, getCardPropTypes, CardLabel } from '../../../util/card'

const TwoCardsSquarePhotoBlock = withCard(
  props => {
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <TwoCardsSquarePhoto>
        {collection.map(item => (
          <TwoCardsSquarePhoto.Item
            key={item._id}
            hat={item.taxonomy?.primary_section?.name}
            title={item.headlines?.basic}
            renderImage={
              <a href={collection[0].canonical_url} title={collection[0].headlines?.basic}>
                {item.promo_items?.basic ? (
                  <Image
                    {...getResizeParamsFromANSImage(item.promo_items?.basic, arcSite, 113, [113])}
                    alt={item.promo_items?.basic.alt_text}
                    sizes={[{ isDefault: true, sourceSizeValue: '113px' }]}
                    height={113}
                    resizedOptions={{
                      auth: item.promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                      smart: true,
                    }}
                  />
                ) : (
                  <img
                    src={fallbackImage}
                    alt={fallbackImageAlt}
                    width={113}
                    height={113}
                    style={{ objectFit: 'cover' }}
                  />
                )}

                <CardLabel {...item} {...item.customFields.label} />
              </a>
            }
          />
        ))}
      </TwoCardsSquarePhoto>
    )
  },
  // This might be unnecessary, but without the `length` a `slice` would be necessary
  { defaultFrom: '0', defaultSize: '2', length: 2 },
)

TwoCardsSquarePhotoBlock.label = 'Two Cards Square Photo - R7 Block'

TwoCardsSquarePhotoBlock.propTypes = {
  customFields: PropTypes.shape({ ...getCardPropTypes(2) }),
}

export default TwoCardsSquarePhotoBlock
