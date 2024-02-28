import '@r7/ui-section-heading/style.css'
import PropTypes from 'prop-types'
import React from 'react'
import { SectionHeading } from '@r7/ui-section-heading'
import { ConditionalLink } from '@r7/ui-base-components'
import { repeatProptypeStructure } from '../../../util/repeat-proptypes-structure'

const SectionHeadingBlock = props => {
  const { type, title, imageURL, imageAlt, url, urlDescription, color } = props.customFields

  const tags = [1, 2, 3].map(tag => {
    return {
      title: props.customFields[`tagTitle${tag}`],
      url: props.customFields[`tagUrl${tag}`],
      urlDescription: props.customFields[`tagUrlDescription${tag}`],
    }
  })

  return (
    <SectionHeading color={color || undefined}>
      <ConditionalLink href={url} title={urlDescription || title}>
        {type === 'image' ? (
          <SectionHeading.Image src={imageURL} alt={imageAlt || undefined} />
        ) : (
          <SectionHeading.Title>{title}</SectionHeading.Title>
        )}
      </ConditionalLink>

      <SectionHeading.Line />

      <SectionHeading.Tags>
        {tags.map(tag => {
          return (
            tag.title && (
              <SectionHeading.Tag
                key={tag.title}
                href={tag.url}
                title={tag.urlDescription || tag.title}
              >
                {tag.title}
              </SectionHeading.Tag>
            )
          )
        })}
      </SectionHeading.Tags>
    </SectionHeading>
  )
}

SectionHeadingBlock.label = 'Título do Bloco - R7 Block'

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
      label: 'Imagem (110x70)',
      searchable: 'image',
    }),
    imageAlt: PropTypes.string.tag({
      label: 'Descrição da imagem (alt)',
      description: 'Descreva o que você vê na imagem',
    }),
    url: PropTypes.string.tag({
      label: 'URL da seção (https)',
      description: 'Serve pra ambos templates',
    }),
    urlDescription: PropTypes.string.tag({
      label: 'Descrição da URL',
      description: 'Descreva a seção/conteúdo do link destino (não deve ser igual ao título)',
    }),
    color: PropTypes.string.tag({
      label: 'Cor da seção (hexadecimal/rgb)',
      description: 'Cor da editoria (colore o titulo e o separador)',
    }),
    ...repeatProptypeStructure({
      count: 3,
      shapeTemplate(counter) {
        return {
          [`tagTitle${counter}`]: PropTypes.string.tag({
            group: `Tag ${counter}`,
            label: 'Título',
          }),
          [`tagUrl${counter}`]: PropTypes.string.tag({
            group: `Tag ${counter}`,
            label: 'URL (https)',
          }),
          [`tagUrlDescription${counter}`]: PropTypes.string.tag({
            group: `Tag ${counter}`,
            label: 'Descrição da URL',
            description: 'Descreva a tag/conteúdo do link destino (não deve ser igual ao título)',
          }),
        }
      },
    }),
  }),
}

export default SectionHeadingBlock
