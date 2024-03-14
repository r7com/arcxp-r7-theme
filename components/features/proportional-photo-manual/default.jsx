import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { Card, ProportionalPhoto } from '@r7/ui-card'
import { withCard, getManualCardPropTypes, getHatBySite } from '../../../util/card/helpers'

const CONTENT_LENGTH = 1

const ProportionalPhotoManual = withCard(
  props => {
    const { content, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    const [item] = content

    const { name: hatName } = getHatBySite({ taxonomy: item?.taxonomy })

    return (
      <ProportionalPhoto>
        <ProportionalPhoto.Figure>
          <a href={item?.canonical_url} title={item?.headlines?.basic}>
            {item?.promo_items?.basic ? (
              <Image
                {...getResizeParamsFromANSImage(item?.promo_items?.basic, arcSite, 1100, [1100])}
                alt={item?.promo_items?.basic.alt_text}
                sizes={[{ isDefault: true, sourceSizeValue: '1100px' }]}
                resizedOptions={{
                  auth: item.promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                  smart: true,
                }}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <img
                data-tb-thumbnail
                src={fallbackImage}
                alt={fallbackImageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
          </a>
        </ProportionalPhoto.Figure>
        <ProportionalPhoto.TextWrapper>
          <Card.HatWrapper>
            <a href={item?.canonical_url} title={item?.headlines?.basic}>
              <Card.HatTitle>{hatName}</Card.HatTitle>
            </a>
          </Card.HatWrapper>
          <ProportionalPhoto.Title>
            <a href={item?.canonical_url} title={item?.headlines?.basic}>
              {item?.headlines?.basic}
            </a>
          </ProportionalPhoto.Title>
        </ProportionalPhoto.TextWrapper>
      </ProportionalPhoto>
    )
  },
  { length: CONTENT_LENGTH, mode: 'manual' },
)

ProportionalPhotoManual.label = '(Manual) Foto Média - R7 Block'

ProportionalPhotoManual.propTypes = {
  customFields: PropTypes.shape({ ...getManualCardPropTypes(CONTENT_LENGTH) }),
}

export default ProportionalPhotoManual
