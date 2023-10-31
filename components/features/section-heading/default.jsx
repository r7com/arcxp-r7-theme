import PropTypes from 'prop-types'
import React from 'react'
import { SectionHeading } from '@r7/ui-section-heading'
import '@r7/ui-section-heading/style.css'

const SectionHeadingBlock = props => {
  const { type, title, imageURL, imageAlt, description, url, color } = props.customFields

  const tags = [1, 2, 3].map(tag => {
    return {
      title: props.customFields[`tagLabel${tag}`],
      url: props.customFields[`tagUrl${tag}`],
      description: props.customFields[`tagDescription${tag}`],
    }
  })

  return (
    <SectionHeading color={color || undefined}>
      <a href={url || undefined} title={description || undefined}>
        {type === 'image' ? (
          <SectionHeading.Image src={imageURL} alt={imageAlt || undefined} />
        ) : (
          <SectionHeading.Title>{title}</SectionHeading.Title>
        )}
      </a>

      <SectionHeading.Line />

      <SectionHeading.Tags>
        {tags.map((tag, i) => {
          return (
            tag.title && (
              <SectionHeading.Tag key={i} href={tag.url || undefined}>
                {tag.title}
              </SectionHeading.Tag>
            )
          )
        })}
      </SectionHeading.Tags>
    </SectionHeading>
  )
}

SectionHeadingBlock.label = 'Section Heading - R7 Block'

SectionHeadingBlock.icon = 'arc-headline'

SectionHeadingBlock.propTypes = {
  customFields: PropTypes.shape({
    type: PropTypes.oneOf(['text', 'image']).tag({
      label: 'Template',
      labels: {
        text: 'Texto',
        image: 'Imagem',
      },
      defaultValue: 'text',
      description: 'Exibe o título como texto ou imagem"',
    }),
    title: PropTypes.string.tag({
      label: 'Título',
      description: 'Mostrado quando o template é "texto"',
    }),
    imageURL: PropTypes.string.tag({
      label: 'Imagem',
      searchable: 'image',
    }),
    imageAlt: PropTypes.string.tag({
      label: 'Descrição da imagem (alt)',
      description: 'Descreva o que você vê na imagem',
    }),
    description: PropTypes.string.tag({
      label: 'Descrição da seção',
      description: 'Descreva a seção/conteúdo do link destino (não deve ser igual ao título)',
    }),
    url: PropTypes.string.tag({
      label: 'URL da seção (https)',
      description: 'Serve pra ambos templates',
    }),
    color: PropTypes.string.tag({
      label: 'Cor da seção (hexadecimal/rgb)',
      description: 'Cor da editoria (colore o titulo e o separador)',
    }),
    tagLabel1: PropTypes.string.tag({
      group: 'Tag 1',
      label: 'Texto',
    }),
    tagUrl1: PropTypes.string.tag({
      group: 'Tag 1',
      label: 'Url',
    }),
    tagDescription1: PropTypes.string.tag({
      group: 'Tag 1',
      label: 'Descrição (opcional)',
      description: 'Descreva a tag/conteúdo do link destino (não deve ser igual à tag)',
    }),
    tagLabel2: PropTypes.string.tag({
      group: 'Tag 2',
      label: 'Texto',
    }),
    tagUrl2: PropTypes.string.tag({
      group: 'Tag 2',
      label: 'Url',
    }),
    tagDescription2: PropTypes.string.tag({
      group: 'Tag 2',
      label: 'Descrição (opcional)',
      description: 'Descreva a tag/conteúdo do link destino (não deve ser igual à tag)',
    }),
    tagLabel3: PropTypes.string.tag({
      group: 'Tag 3',
      label: 'Texto',
    }),
    tagUrl3: PropTypes.string.tag({
      group: 'Tag 3',
      label: 'Url',
    }),
    tagDescription3: PropTypes.string.tag({
      group: 'Tag 3',
      label: 'Descrição (opcional)',
      description: 'Descreva a tag/conteúdo do link destino (não deve ser igual à tag)',
    }),
  }),
}

export default SectionHeadingBlock
