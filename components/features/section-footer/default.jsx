import React from 'react'
import PropTypes from 'prop-types'
import '@r7/ui-section-foot/style.css'
import { SectionFoot } from '@r7/ui-section-foot'

const SectionFootBlock = props => {
  const { background, title, urlDescription, url } = props.customFields

  return (
    <SectionFoot bg={background || undefined}>
      <SectionFoot.Line />

      <SectionFoot.Link href={url} title={urlDescription ?? title}>
        {title}
      </SectionFoot.Link>
    </SectionFoot>
  )
}

SectionFootBlock.label = 'Section Foot - R7 Block'

SectionFootBlock.icon = 'arc-headline'

SectionFootBlock.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      label: 'Título',
      description: 'Texto que sera mostrado no fim da sessão',
    }),
    url: PropTypes.string.tag({
      label: 'URL da seção (https)',
      description: 'Link para saber mais sobre a sessão',
    }),
    urlDescription: PropTypes.string.tag({
      label: 'Descrição da URL',
      description: 'Descreva a seção/conteúdo do link destino (não deve ser igual ao título)',
    }),
    background: PropTypes.string.tag({
      label: 'Cor da seção (hexadecimal/rgb)',
      description: 'Cor da editoria (colore o separador e o fundo do texto)',
    }),
  }),
}

export default SectionFootBlock
