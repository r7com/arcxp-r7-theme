import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { Guerra } from '@r7/ui-card'
import { Bullet } from '@r7/ui-base-components'
import { withCard, getCardPropTypes, CardLabel, CardHat } from '../../../util/card'

const GuerraBlock = withCard(
  props => {
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <Guerra>
        <Guerra.Figure>
          <a href={collection[0].canonical_url} title={collection[0].headlines?.basic}>
            {collection[0].promo_items?.basic ? (
              <Image
                {...getResizeParamsFromANSImage(collection[0].promo_items?.basic, arcSite, 1100, [
                  1100,
                ])}
                alt={collection[0].promo_items?.basic.alt_text}
                sizes={[{ isDefault: true, sourceSizeValue: '1100px' }]}
                height={628}
                resizedOptions={{
                  auth: collection[0].promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                  smart: true,
                }}
                style={{ width: '100%', height: 'auto' }}
                data-tb-thumbnail
              />
            ) : (
              <img
                src={fallbackImage}
                alt={fallbackImageAlt}
                data-tb-thumbnail
                style={{ objectFit: 'contain', width: '100%', height: 628 }}
              />
            )}
            <CardLabel {...collection[0]} />
          </a>
        </Guerra.Figure>

        <Guerra.Overlay>
          <CardHat {...collection[0]} type="warning" color="high-bold" />

          <Guerra.Title>
            <a href={collection[0].canonical_url} title={collection[0].headlines?.basic}>
              {collection[0].headlines?.basic}
            </a>
          </Guerra.Title>

          <Guerra.Bullets>
            {collection.slice(1).map(item => (
              <Bullet key={item._id} url={item.canonical_url} color="neutralHigh">
                {item.headlines.basic}
              </Bullet>
            ))}
          </Guerra.Bullets>
        </Guerra.Overlay>
      </Guerra>
    )
  },
  { defaultSize: 9, length: 9 },
)

GuerraBlock.label = 'Guerra - R7 Block'
GuerraBlock.static = true

GuerraBlock.propTypes = {
  customFields: PropTypes.shape({ ...getCardPropTypes(1) }),
}

export default GuerraBlock
