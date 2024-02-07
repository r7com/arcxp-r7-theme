import React from 'react'
import { Typography } from '@r7/ui-base-components'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import PropTypes from '@arc-fusion/prop-types'
import { MostRead } from '@r7/ui-card'
import { getCardPropTypes, withCard } from '../../../util/card'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'

const MostReadBlock = withCard(
  props => {
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <MostRead>
        <Typography primaryTitle as="header">
          Mais Lidas
        </Typography>
        <MostRead.List>
          {collection.map(({ headlines, _id, canonical_url, promo_items, taxonomy }, i) => {
            const {
              primary_section: { name },
            } = taxonomy
            const order = i + 1
            return (
              <MostRead.Item key={_id}>
                <MostRead.Link url={canonical_url} title={headlines.basic}>
                  <MostRead.Figure>
                    {promo_items?.basic ? (
                      <Image
                        {...getResizeParamsFromANSImage(promo_items?.basic, arcSite, 141, [141])}
                        alt={promo_items?.basic.alt_text}
                        sizes={[{ isDefault: true, sourceSizeValue: '141px' }]}
                        height={141}
                        resizedOptions={{
                          auth: promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                          smart: true,
                        }}
                        style={{
                          width: 141,
                          height: 141,
                          objectFit: 'contain',
                          marginBottom: '16px',
                          borderRadius: '4px',
                        }}
                      />
                    ) : (
                      <img
                        src={fallbackImage}
                        alt={fallbackImageAlt}
                        width={141}
                        height={141}
                        style={{ width: 141, height: 141, objectFit: 'contain' }}
                      />
                    )}
                  </MostRead.Figure>
                  <MostRead.Order order={order}>
                    <MostRead.Hat>{name}</MostRead.Hat>
                    <MostRead.Title>{headlines.basic}</MostRead.Title>
                  </MostRead.Order>
                </MostRead.Link>
              </MostRead.Item>
            )
          })}
        </MostRead.List>
      </MostRead>
    )
  },
  { defaultFrom: '0', defaultSize: '7', length: 7 },
)

MostReadBlock.propTypes = {
  customFields: PropTypes.shape({ ...getCardPropTypes(2) }),
}

MostReadBlock.label = 'Mais Lidas - R7 Block'

export default MostReadBlock
