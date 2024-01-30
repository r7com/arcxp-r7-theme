import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { Bullet } from '@r7/ui-base-components'
import { LeftPhoto } from '@r7/ui-card'
import { withCard, getCardPropTypes, CardLabel, CardHat } from '../../../util/card'

const TwoCardsLandscapeBullet = withCard(
  props => {
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <LeftPhoto>
        {collection.slice(0, 2).map(item => (
          <LeftPhoto.Item key={item._id}>
            <LeftPhoto.Flex>
              <LeftPhoto.Figure format="landscape">
                <a href={item.canonical_url} title={item.headlines?.basic}>
                  {item.promo_items?.basic ? (
                    <Image
                      {...getResizeParamsFromANSImage(item.promo_items?.basic, arcSite, 160, [160])}
                      alt={item.promo_items?.basic.alt_text}
                      sizes={[{ isDefault: true, sourceSizeValue: '160px' }]}
                      height={90}
                      resizedOptions={{
                        auth: item.promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                        smart: true,
                      }}
                      style={{ width: 160, height: 90, objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={fallbackImage}
                      alt={fallbackImageAlt}
                      width={160}
                      height={90}
                      style={{ width: 160, height: 90, objectFit: 'contain' }}
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

        {collection[2] && (
          <Bullet url={collection[2].canonical_url}>{collection[2].headlines?.basic}</Bullet>
        )}
      </LeftPhoto>
    )
  },
  { defaultFrom: '0', defaultSize: '3', length: 3 },
)

TwoCardsLandscapeBullet.label = 'Duas chamadas retangular com bullet - R7 Block'

TwoCardsLandscapeBullet.propTypes = {
  customFields: PropTypes.shape({ ...getCardPropTypes(2) }),
}

export default TwoCardsLandscapeBullet
