import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { LeftPhoto } from '@r7/ui-card'
import { withCard, getCardPropTypes, CardLabel, CardHat } from '../../../util/card'

const TwoCardsLandscapeVariant = withCard(
  props => {
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <LeftPhoto>
        {collection.map(item => (
          <LeftPhoto.Item key={item._id}>
            <LeftPhoto.Flex>
              <a href={item.canonical_url} title={item.headlines?.basic}>
                <LeftPhoto.Figure imgSize="large" format="landscape">
                  {item.promo_items?.basic ? (
                    <Image
                      {...getResizeParamsFromANSImage(item.promo_items?.basic, arcSite)}
                      alt={item.promo_items?.basic.alt_text}
                      resizedOptions={{
                        auth: item.promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                        smart: true,
                      }}
                    />
                  ) : (
                    <img
                      src={fallbackImage}
                      alt={fallbackImageAlt}
                      height="auto"
                      style={{ objectFit: 'contain', height: '100%' }}
                    />
                  )}

                  <CardLabel {...item} />
                </LeftPhoto.Figure>
              </a>

              <LeftPhoto.TextWrapper>
                <CardHat {...item} />

                <LeftPhoto.Title fontSize="large">
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
  { defaultFrom: '0', defaultSize: '2', length: 2 },
)

TwoCardsLandscapeVariant.label = 'Duas chamadas retangulares grande - R7 Block'

TwoCardsLandscapeVariant.propTypes = {
  customFields: PropTypes.shape({ ...getCardPropTypes(2) }),
}

export default TwoCardsLandscapeVariant
