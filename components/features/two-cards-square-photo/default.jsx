import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import '@r7/ui-card/style.css'
import { TwoCardsSquarePhoto } from '@r7/ui-card'

export const TwoCardsSquarePhotoBlock = props => {
  const { config, display } = props.customFields
  const { arcSite, isAdmin } = useFusionContext()
  const { fallbackImage, fallbackImageAlt } = getProperties(arcSite)

  const content = useContent({
    source: config?.contentService,
    query: {
      ...config?.contentConfigValues,
      from: '0',
      size: '2',
    },
  })

  if (!display && isAdmin) {
    return <p>Este bloco está oculto. Mude suas configurações para exibí-lo.</p>
  }

  if (!content && isAdmin) {
    return <p>É necessário definir uma fonte de conteúdo para este bloco.</p>
  }

  return (
    display &&
    content && (
      <TwoCardsSquarePhoto>
        {content.content_elements.map(item => (
          <TwoCardsSquarePhoto.Item
            key={item._id}
            hat={item.taxonomy?.primary_section?.name}
            renderImage={
              <>
                {item.promo_items?.basic ? (
                  <Image
                    {...getResizeParamsFromANSImage(item.promo_items?.basic, arcSite, 113, [113])}
                    alt={item.promo_items?.basic.alt_text}
                    sizes={[{ isDefault: true, sourceSizeValue: '113px' }]}
                    height={113}
                    resizedOptions={{
                      auth: item.promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                      smart: true,
                    }}
                  />
                ) : (
                  <img
                    src={fallbackImage}
                    alt={fallbackImageAlt}
                    width={113}
                    height={113}
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </>
            }
            title={item.headlines?.basic}
          />
        ))}
      </TwoCardsSquarePhoto>
    )
  )
}

TwoCardsSquarePhotoBlock.label = 'Two Cards Square Photo - R7 Block'

TwoCardsSquarePhotoBlock.icon = 'tags'

TwoCardsSquarePhotoBlock.propTypes = {
  customFields: PropTypes.shape({
    config: PropTypes.contentConfig().tag({
      group: 'Configurar conteúdo',
      label: 'Fonte de conteúdo',
      searchable: 'image',
    }),
    display: PropTypes.boolean.tag({
      label: 'Exibir bloco',
    }),
  }),
}

export default TwoCardsSquarePhotoBlock
