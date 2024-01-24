import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { Bullet } from '@r7/ui-base-components'
import { LeftPhoto } from '@r7/ui-card'
import { withCard, getCardPropTypes, CardLabel, CardHat } from '../../../util/card'

const TwoCardsLandscapeVariant = withCard(
  props => {
    const { collection, siteProperties } = props.cardProps
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <LeftPhoto>
        {collection.slice(0, 2).map(item => (
          <LeftPhoto.Item key={item._id}>
            <LeftPhoto.Flex>
              <LeftPhoto.Figure imgSize="large" format="landscape">
                <a href={item.canonical_url} title={item.headlines?.basic}>
                  {item.promo_items?.basic ? (
                    <Image
                      {...getResizeParamsFromANSImage(item.promo_items?.basic)}
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
                </a>
              </LeftPhoto.Figure>

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

        {collection[2] && (
          <Bullet url={collection[2].canonical_url}>{collection[2].headlines?.basic}</Bullet>
        )}
      </LeftPhoto>
    )
  },
  { defaultFrom: '0', defaultSize: '2', length: 2 },
)

TwoCardsLandscapeVariant.label = 'Duas chamadas retangulares grandes - R7 Block'

TwoCardsLandscapeVariant.propTypes = {
  customFields: PropTypes.shape({ ...getCardPropTypes(2) }),
}

export default TwoCardsLandscapeVariant
