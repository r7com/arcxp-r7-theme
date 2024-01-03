import '@r7/ui-card/style.css'

import React from 'react'
import PropTypes from 'prop-types'

import { repeatProptypeStructure } from '../../../util/repeat-proptypes-structure'
import { filterBars } from './utils/helpers'
import { BreakingNews } from '@r7/ui-card'

function BreakingNewsBar({ customFields }) {
  const bars = filterBars(customFields)

  console.log(bars)

  return (
    <>
      {bars.map((bar, index) => (
        <BreakingNews key={index} {...bar} />
      ))}
    </>
  )
}

BreakingNewsBar.label = 'Barra Urgente - R7 Block'

BreakingNewsBar.propTypes = {
  customFields: PropTypes.shape({
    ...repeatProptypeStructure({
      count: 3,
      shapeTemplate(counter) {
        return {
          [`showBar${counter}`]: PropTypes.bool.tag({
            group: `Barra ${counter}`,
            label: 'Mostrar barra?',
            defaultValue: true,
          }),
          [`theme${counter}`]: PropTypes.oneOf(['live', 'urgent', 'now']).tag({
            group: `Barra ${counter}`,
            label: 'Tema',
            labels: {
              live: 'Ao vivo (padrão)',
              urgent: 'Urgente',
              now: 'Agora',
            },
            defaultValue: 'live',
          }),
          [`tag${counter}`]: PropTypes.string.tag({
            group: `Barra ${counter}`,
            label: 'Tag',
            defaultValue: '',
          }),
          [`title${counter}`]: PropTypes.string.tag({
            group: `Barra ${counter}`,
            label: 'Titulo',
            defaultValue: 'Meu título',
          }),
          [`href${counter}`]: PropTypes.string.tag({
            group: `Barra ${counter}`,
            label: 'Link para noticia',
            defaultValue: '#',
          }),
          [`showImage${counter}`]: PropTypes.bool.tag({
            group: `Barra ${counter}`,
            label: 'Mostrar imagem da barra?',
            defaultValue: true,
          }),
          [`imageUrl${counter}`]: PropTypes.string.tag({
            group: `Barra ${counter}`,
            label: 'Url da imagem',
            defaultValue: '#',
          }),
          [`imageAlt${counter}`]: PropTypes.string.tag({
            group: `Barra ${counter}`,
            label: 'Alt da imagem',
            defaultValue: 'Alt para imagem',
          }),
        }
      },
    }),
  }),
}

export default BreakingNewsBar
