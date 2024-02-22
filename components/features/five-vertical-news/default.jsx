import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { withCard, getCardPropTypes } from '../../../util/card'
import { FiveVerticalNews } from '@r7/ui-card'

const FiveVerticalNewsBlock = withCard(
  props => {
    const { blockTitle } = props.customFields
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties

    const [primaryCard, ...secondaryCards] = collection

    return (
      <FiveVerticalNews>
        <FiveVerticalNews.Title>{blockTitle}</FiveVerticalNews.Title>
        <FiveVerticalNews.Cards>
          <FiveVerticalNews.PrimaryItem>
            <FiveVerticalNews.ItemFigure>
              {primaryCard.promo_items?.basic ? (
                <Image
                  {...getResizeParamsFromANSImage(primaryCard.promo_items.basic, arcSite, 289)}
                  alt={primaryCard.promo_items.basic.alt_text}
                  sizes={[{ isDefault: true, sourceSizeValue: '289px' }]}
                  resizedOptions={{
                    auth: primaryCard.promo_items.basic.auth[RESIZER_TOKEN_VERSION],
                    smart: true,
                  }}
                />
              ) : (
                <img src={fallbackImage} alt={fallbackImageAlt} width="100%" height="auto" />
              )}
            </FiveVerticalNews.ItemFigure>
            <FiveVerticalNews.ItemTitle>{primaryCard.headlines.basic}</FiveVerticalNews.ItemTitle>
          </FiveVerticalNews.PrimaryItem>
          {secondaryCards.map(card => (
            <FiveVerticalNews.SecondaryItem key={card._id}>
              <FiveVerticalNews.ItemFigure>
                {card.promo_items?.basic ? (
                  <Image
                    {...getResizeParamsFromANSImage(card.promo_items.basic, arcSite, 185)}
                    alt={card.promo_items.basic.alt_text}
                    sizes={[{ isDefault: true, sourceSizeValue: '185px' }]}
                    resizedOptions={{
                      auth: card.promo_items.basic.auth[RESIZER_TOKEN_VERSION],
                      smart: true,
                    }}
                  />
                ) : (
                  <img src={fallbackImage} alt={fallbackImageAlt} width="100%" height="auto" />
                )}
              </FiveVerticalNews.ItemFigure>
              <FiveVerticalNews.ItemTitle>{card.headlines.basic}</FiveVerticalNews.ItemTitle>
            </FiveVerticalNews.SecondaryItem>
          ))}
        </FiveVerticalNews.Cards>
      </FiveVerticalNews>
    )
  },
  { defaultSize: 5, length: 5 },
)

FiveVerticalNewsBlock.label = 'Cinco Chamadas Vertical - R7 Block'

FiveVerticalNewsBlock.propTypes = {
  customFields: PropTypes.shape({
    ...getCardPropTypes(1),
    blockTitle: PropTypes.string.tag({
      label: 'Título',
      defaultValue: '',
    }),
  }),
}

export default FiveVerticalNewsBlock
