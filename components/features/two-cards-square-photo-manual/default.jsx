import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { LeftPhoto, Card } from '@r7/ui-card'
import { getHatBySite, withCard, getManualCardPropTypes } from '../../../util/card/helpers'
import { CardLabel } from '../../../util/card/components'

const CONTENT_LENGTH = 2

const TwoCardsSquarePhotoManual = withCard(
  props => {
    const { content, siteProperties } = props.cardProps
    const { fallbackImage, fallbackImageAlt } = siteProperties

    return (
      <LeftPhoto>
        {content.map(item => {
          const imageUrl = item?.promo_items?.basic?.url || fallbackImage
          const imageAlt = item?.promo_items?.basic?.url || fallbackImageAlt
          const headline = item?.headlines?.basic
          const link = item?.canonical_url
          const hat = getHatBySite({ taxonomy: item?.taxonomy }).name

          return (
            <LeftPhoto.Item key={item?._id}>
              <LeftPhoto.Flex>
                <LeftPhoto.Figure format="square">
                  <a href={link} title={headline}>
                    <img
                      data-tb-thumbnail
                      src={imageUrl}
                      alt={imageAlt}
                      width={113}
                      height={113}
                      style={{ width: 113, height: 113, objectFit: 'cover' }}
                    />
                    <CardLabel
                      customFields={{ label: item.label }}
                      taxonomy={item?.taxonomy}
                      fallbackImage={fallbackImage}
                    />
                  </a>
                </LeftPhoto.Figure>
                <LeftPhoto.TextWrapper>
                  <Card.HatWrapper type={item?.type}>
                    <a href={link} title={headline}>
                      <Card.HatTitle color={item?.color}>{hat}</Card.HatTitle>
                    </a>
                  </Card.HatWrapper>
                  <LeftPhoto.Title fontSize="small">
                    <a href={link} title={headline}>
                      {headline}
                    </a>
                  </LeftPhoto.Title>
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

TwoCardsSquarePhotoManual.propTypes = {
  customFields: PropTypes.shape({ ...getManualCardPropTypes(CONTENT_LENGTH) }),
}

TwoCardsSquarePhotoManual.label = '(Manual) Duas Fotos Pequenas - R7 Block'

export default TwoCardsSquarePhotoManual
