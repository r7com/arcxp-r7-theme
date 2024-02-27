import '@r7/ui-card/style.css'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { TextOverPhoto } from '@r7/ui-card'
import { withCard, getCardPropTypes, CardHat, CardLabel } from '../../../util/card'

const TextOverImageBlock = withCard(
  props => {
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties
    const { layout } = props.customFields

    const LAYOUT_IMAGE_SIZES = {
      half: {
        width: 542,
        height: 330,
        responsiveImages: [542],
        sizes: [{ isDefault: true, sourceSizeValue: '542px' }],
      },
      vertical: {
        width: 208,
        height: 330,
        responsiveImages: [208],
        sizes: [{ isDefault: true, sourceSizeValue: '208px' }],
      },
    }

    const LAYOUTS = {
      vertical: {
        container: {
          size: 'full',
        },
        figure: {
          layout: 'half',
          size: 'full',
          responsiveAfter: 'md',
        },
      },
      half: {
        container: {
          size: 'fullHeight',
        },
        figure: {
          layout: 'vertical',
          size: 'fullHeight',
          responsiveAfter: 'md',
        },
      },
    }

    return (
      <TextOverPhoto {...LAYOUTS[layout].container}>
        <TextOverPhoto.Figure {...LAYOUTS[layout].figure}>
          <a href={collection[0].canonical_url} title={collection[0].headlines?.basic}>
            {collection[0].promo_items?.basic ? (
              <Image
                {...getResizeParamsFromANSImage(
                  collection[0].promo_items?.basic,
                  arcSite,
                  LAYOUT_IMAGE_SIZES[layout].width,
                  [LAYOUT_IMAGE_SIZES[layout].responsiveImages],
                )}
                data-tb-thumbnail
                alt={collection[0].promo_items?.basic.alt_text}
                sizes={LAYOUT_IMAGE_SIZES[layout].sizes}
                height={LAYOUT_IMAGE_SIZES[layout].height}
                resizedOptions={{
                  auth: collection[0].promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                  smart: true,
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img
                data-tb-thumbnail
                src={fallbackImage}
                alt={fallbackImageAlt}
                style={{ objectFit: 'contain', height: 330 }}
              />
            )}
            <CardLabel {...collection[0]} />
          </a>
        </TextOverPhoto.Figure>

        <TextOverPhoto.TextWrapper>
          <CardHat {...collection[0]} color="high" />

          <TextOverPhoto.Title>
            <a href={collection[0].canonical_url} title={collection[0].headlines?.basic}>
              {collection[0].headlines?.basic}
            </a>
          </TextOverPhoto.Title>
        </TextOverPhoto.TextWrapper>
      </TextOverPhoto>
    )
  },
  { defaultSize: 1, length: 1 },
)

TextOverImageBlock.label = 'Texto sobre imagem - R7 Block'

TextOverImageBlock.propTypes = {
  customFields: PropTypes.shape({
    ...getCardPropTypes(1),
    layout: PropTypes.oneOf(['half', 'vertical']).tag({
      label: 'Layout',
      labels: {
        half: 'Half',
        vertical: 'Vertical',
      },
      defaultValue: 'half',
    }),
  }),
}

export default TextOverImageBlock
