import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { LeftPhoto } from '@r7/ui-card'
import { withCard, getCardPropTypes } from '../../../util/card/helpers'
import { CardLabel, CardHat } from '../../../util/card/components'

const TwoCardsSquarePhotoBlock = withCard(
  props => {
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <LeftPhoto>
        {collection.map(item => (
          <LeftPhoto.Item key={item._id}>
            <LeftPhoto.Flex>
              <LeftPhoto.Figure format="square">
                <a href={item.canonical_url} title={item.headlines?.basic}>
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
                      style={{ width: 113, height: 113, objectFit: 'cover' }}
                      data-tb-thumbnail
                    />
                  ) : (
                    <img
                      data-tb-thumbnail
                      src={fallbackImage}
                      alt={fallbackImageAlt}
                      width={113}
                      height={113}
                      style={{ width: 113, height: 113, objectFit: 'cover' }}
                    />
                  )}

                  <CardLabel {...item} />
                </a>
              </LeftPhoto.Figure>

              <LeftPhoto.TextWrapper>
                <CardHat {...item} />

                <LeftPhoto.Title fontSize="small">
                  <a href={item.canonical_url} title={item.headlines?.basic}>
                    {item.headlines?.basic}
                  </a>
                </LeftPhoto.Title>
              </LeftPhoto.TextWrapper>
            </LeftPhoto.Flex>
          </LeftPhoto.Item>
        ))}
      </LeftPhoto>
    )
  },
  { defaultSize: 2, length: 2 },
)

TwoCardsSquarePhotoBlock.label = 'Duas Fotos Pequenas - R7 Block'

TwoCardsSquarePhotoBlock.propTypes = {
  customFields: PropTypes.shape({ ...getCardPropTypes(2) }),
}

export default TwoCardsSquarePhotoBlock
