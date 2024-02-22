import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { ProportionalPhoto } from '@r7/ui-card'
import { withCard, getCardPropTypes, CardHat, CardLabel } from '../../../util/card'
import { Bullet } from '@r7/ui-base-components'

const PrimaryCallPhotoTextSecondBullet = withCard(
  props => {
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <ProportionalPhoto>
        <ProportionalPhoto.Figure>
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
            <CardLabel {...collection[0]} />
          </a>
        </ProportionalPhoto.Figure>

        <ProportionalPhoto.TextWrapper marginBottom>
          <CardHat {...collection[0]} />

          <a href={collection[0].canonical_url} title={collection[0].headlines?.basic}>
            <ProportionalPhoto.Title>{collection[0].headlines?.basic}</ProportionalPhoto.Title>
          </a>
        </ProportionalPhoto.TextWrapper>

        <ProportionalPhoto.TextWrapper>
          <CardHat {...collection[1]} />
          <ProportionalPhoto.Title>
            <Bullet url={collection[1].canonical_url}>{collection[1].headlines.basic}</Bullet>
          </ProportionalPhoto.Title>
        </ProportionalPhoto.TextWrapper>
      </ProportionalPhoto>
    )
  },
  { defaultFrom: '0', defaultSize: '2', length: 2 },
)

PrimaryCallPhotoTextSecondBullet.label =
  'Chamada com foto e texto segunda chamada com bullet - R7 Block'

PrimaryCallPhotoTextSecondBullet.propTypes = {
  customFields: PropTypes.shape({
    ...getCardPropTypes(1),
  }),
}

export default PrimaryCallPhotoTextSecondBullet
