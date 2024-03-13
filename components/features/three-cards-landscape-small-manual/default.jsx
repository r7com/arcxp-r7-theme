import '@r7/ui-card/style.css'
import React from 'react'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import PropTypes from '@arc-fusion/prop-types'
import { Card, LeftPhoto } from '@r7/ui-card'
import { getHatBySite, withCard, getManualCardPropTypes } from '../../../util/card/helpers'

const CONTENT_LENGTH = 3

const ThreeSmallPhotosManual = withCard(
  props => {
    const { content, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <LeftPhoto>
        {content.map(item => {
          const { name: hatName } = getHatBySite({ taxonomy: item?.taxonomy })

          return (
            <LeftPhoto.Item key={item?._id}>
              <LeftPhoto.Flex>
                <LeftPhoto.Figure format="landscape">
                  <a href={item?.canonical_url} title={item?.headlines?.basic}>
                    {item?.promo_items?.basic ? (
                      <Image
                        {...getResizeParamsFromANSImage(item?.promo_items?.basic, arcSite, 113, [
                          113,
                        ])}
                        alt={item?.promo_items?.basic.alt_text}
                        sizes={[{ isDefault: true, sourceSizeValue: '113px' }]}
                        resizedOptions={{
                          auth: item.promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                          smart: true,
                        }}
                        style={{ width: 113, height: 65, objectFit: 'cover' }}
                        data-tb-thumbnail
                      />
                    ) : (
                      <img
                        data-tb-thumbnail
                        src={fallbackImage}
                        alt={fallbackImageAlt}
                        width={113}
                        height={65}
                        style={{ width: 113, height: 64, objectFit: 'contain' }}
                      />
                    )}
                  </a>
                </LeftPhoto.Figure>
                <LeftPhoto.TextWrapper>
                  <Card.HatWrapper>
                    <a href={item?.canonical_url} title={item?.headlines?.basic}>
                      <Card.HatTitle>{hatName}</Card.HatTitle>
                    </a>
                  </Card.HatWrapper>
                  <a href={item?.canonical_url} title={item?.headlines?.basic}>
                    <LeftPhoto.Title fontSize="small">{item?.headlines?.basic}</LeftPhoto.Title>
                  </a>
                </LeftPhoto.TextWrapper>
              </LeftPhoto.Flex>
            </LeftPhoto.Item>
          )
        })}
      </LeftPhoto>
    )
  },
  { length: CONTENT_LENGTH, mode: 'manual' },
)

ThreeSmallPhotosManual.label = '(Manual) Três Fotos Pequenas - R7 Block'

ThreeSmallPhotosManual.propTypes = {
  customFields: PropTypes.shape({ ...getManualCardPropTypes(CONTENT_LENGTH) }),
}

export default ThreeSmallPhotosManual
