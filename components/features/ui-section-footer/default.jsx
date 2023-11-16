import React from 'react'
import PropTypes from 'prop-types'
import { SectionFoot } from '@r7/ui-section-foot'
import '@r7/ui-section-foot/style.css'

const SectionFootBlock = props => {
  const { background, text, url } = props.customFields
  return (
    <SectionFoot bg={background || undefined}>
      <SectionFoot.Line />

      <SectionFoot.Link href={url} title={text}>
        {text}
      </SectionFoot.Link>
    </SectionFoot>
  )
}

SectionFootBlock.label = 'Section Foot - R7 Block'
SectionFootBlock.icon = 'arc-headline'

SectionFootBlock.propTypes = {
  customFields: PropTypes.shape({
    text: PropTypes.string.tag({
      label: 'Texto',
      description: 'Texto que sera mostrado no fim da sessão"',
    }),
    url: PropTypes.string.tag({
      label: 'URL da seção (https)',
      description: 'Link para saber mais sobre a sessão',
    }),
    background: PropTypes.string.tag({
      label: 'Cor da seção (hexadecimal/rgb)',
      description: 'Cor da editoria (colore o separador e o fundo do texto)',
    }),
  }),
}
export default SectionFootBlock
