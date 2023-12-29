import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import '@r7/ui-card/style.css'
import { TwoCardsSquarePhoto, Card } from '@r7/ui-card'

export const TwoCardsSquarePhotoBlock = props => {
  const { config, display } = props.customFields
  const { arcSite, isAdmin } = useFusionContext()
  const { fallbackImage, fallbackImageAlt } = getProperties(arcSite)

  const content = useContent({
    source: config?.contentService,
    query: {
      ...config?.contentConfigValues,
      from: config?.contentConfigValues.from ?? '0',
      size: config?.contentConfigValues.size ?? '2',
    },
  })

  const customFields = [1, 2].map(field => {
    return {
      displayLabel: props.customFields[`displayLabel${field}`],
      label: props.customFields[`label${field}`],
      sponsoredBy: props.customFields[`sponsoredBy${field}`],
      sponsoredByImage: props.customFields[`sponsoredByImage${field}`],
      sponsoredByTitle: props.customFields[`sponsoredByTitle${field}`],
      sponsoredByImageDesc: props.customFields[`sponsoredByImageDesc${field}`],
      sponsoredByUrl: props.customFields[`sponsoredByUrl${field}`],
    }
  })

  const blocks = [
    { ...content?.content_elements[0], ...customFields[0] },
    { ...content?.content_elements[1], ...customFields[1] },
  ].filter(item => item._id)

  if (!display && isAdmin) {
    return <p>Este bloco está oculto. Mude suas configurações para exibí-lo.</p>
  }

  if (!content && isAdmin) {
    return <p>É necessário definir uma fonte de conteúdo para este bloco.</p>
  }

  const LABEL_BY_SITE = {
    '/prisma': 'blog',
    '/estudio': 'studio',
  }

  return (
    display &&
    content && (
      <TwoCardsSquarePhoto>
        {blocks.map(item => (
          <TwoCardsSquarePhoto.Item
            key={item._id}
            hat={item.taxonomy?.primary_section?.name}
            title={item.headlines?.basic}
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

                {(item.sponsoredBy ||
                  (item.displayLabel && item.label && item.label !== 'automatic') ||
                  (item.displayLabel &&
                    item.label === 'automatic' &&
                    LABEL_BY_SITE[item.taxonomy?.primary_site?.path])) && (
                  <Card.Label
                    sponsoredByImage={item.sponsoredByImage ?? fallbackImage}
                    sponsoredByImageDesc={item.sponsoredByImageDesc}
                    sponsoredByTitle={item.sponsoredByTitle}
                    sponsoredByUrl={item.sponsoredByUrl}
                    type={
                      item.sponsoredBy
                        ? 'sponsored-by'
                        : item.label === 'automatic'
                        ? LABEL_BY_SITE[item.taxonomy?.primary_site?.path]
                        : item.label
                    }
                  />
                )}
              </>
            }
          />
        ))}
      </TwoCardsSquarePhoto>
    )
  )
}

TwoCardsSquarePhotoBlock.label = 'Two Cards Square Photo - R7 Block'

TwoCardsSquarePhotoBlock.propTypes = {
  customFields: PropTypes.shape({
    display: PropTypes.boolean.tag({
      label: 'Exibir bloco',
      defaultValue: true,
    }),
    displayLabel1: PropTypes.boolean.tag({
      group: '1. Label',
      label: 'Exibir label',
      defaultValue: true,
    }),
    label1: PropTypes.oneOf([
      'automatic',
      'live',
      'blog',
      'studio',
      'voting',
      'podcast',
      'aclr',
    ]).tag({
      group: '1. Label',
      label: 'Template',
      labels: {
        automatic: 'Automático (padrão)',
        live: 'Ao vivo',
        blog: 'Blog',
        studio: 'Estúdio',
        voting: 'Votação',
        podcast: 'Podcast',
        aclr: 'ACLR',
      },
      defaultValue: 'automatic',
    }),
    sponsoredBy1: PropTypes.boolean.tag({
      label: 'Exibir oferecido por',
      group: '1. Oferecido por',
    }),
    sponsoredByImage1: PropTypes.string.tag({
      group: '1. Oferecido por',
      label: 'Imagem (24px largura)',
      searchable: 'image',
    }),
    sponsoredByImageDesc1: PropTypes.string.tag({
      group: '1. Oferecido por',
      label: 'Descrição da imagem (alt)',
      description: 'Descreva o que você vê na imagem',
    }),
    sponsoredByTitle1: PropTypes.string.tag({
      group: '1. Oferecido por',
      label: 'Titulo',
      description: 'Descreva o conteúdo do link destino',
    }),
    sponsoredByUrl1: PropTypes.string.tag({
      group: '1. Oferecido por',
      label: 'URL (https)',
    }),
    displayLabel2: PropTypes.boolean.tag({
      group: '2. Label',
      label: 'Exibir label',
      defaultValue: true,
    }),
    label2: PropTypes.oneOf([
      'automatic',
      'live',
      'blog',
      'studio',
      'voting',
      'podcast',
      'aclr',
    ]).tag({
      group: '2. Label',
      label: 'Template',
      labels: {
        automatic: 'Automático (padrão)',
        live: 'Ao vivo',
        blog: 'Blog',
        studio: 'Estúdio',
        voting: 'Votação',
        podcast: 'Podcast',
        aclr: 'ACLR',
      },
      defaultValue: 'automatic',
    }),
    sponsoredBy2: PropTypes.boolean.tag({
      label: 'Exibir oferecido por',
      group: '2. Oferecido por',
    }),
    sponsoredByImage2: PropTypes.string.tag({
      group: '2. Oferecido por',
      label: 'Imagem (24px largura)',
      searchable: 'image',
    }),
    sponsoredByImageDesc2: PropTypes.string.tag({
      group: '2. Oferecido por',
      label: 'Descrição da imagem (alt)',
      description: 'Descreva o que você vê na imagem',
    }),
    sponsoredByTitle2: PropTypes.string.tag({
      group: '2. Oferecido por',
      label: 'Titulo',
      description: 'Descreva o conteúdo do link destino',
    }),
    sponsoredByUrl2: PropTypes.string.tag({
      group: '2. Oferecido por',
      label: 'URL (https)',
    }),
    config: PropTypes.contentConfig().tag({
      group: 'Configurar conteúdo',
      label: 'Fonte de conteúdo',
    }),
  }),
}

export default TwoCardsSquarePhotoBlock
