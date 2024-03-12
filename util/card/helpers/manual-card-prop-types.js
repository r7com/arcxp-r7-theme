import PropTypes from '@arc-fusion/prop-types'
import { repeatProptypeStructure } from '../../repeat-proptypes-structure'
import { getLabelPropTypes } from './get-label-props'

/**
 * getManualCardPropTypes
 *
 * Includes the following fields:
 * - Exibir bloco (checkbox)
 * - Exibir label
 * - ..campos "label"
 * - Exibir oferecido por
 * - ..campos "oferecido por"
 * - Configurar conteúdo (collection)
 */
export function getManualCardPropTypes(cards = 1) {
  return {
    display: PropTypes.boolean.tag({
      label: 'Exibir bloco',
      defaultValue: true,
    }),
    ...repeatProptypeStructure({
      count: cards,
      shapeTemplate(counter) {
        return {
          [`_id-${counter}`]: PropTypes.contentConfig('ans-item').tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Display Content Info',
          }),
          [`headline-${counter}`]: PropTypes.richtext.tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Título da Matéria',
          }),
          [`link-${counter}`]: PropTypes.string.tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Link da Matéria',
          }),
          [`hat-${counter}`]: PropTypes.string.tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Título Chapéu da Matéria',
          }),
          [`image-${counter}`]: PropTypes.string.tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Imagem da Matéria',
            searchable: 'image',
          }),
          [`image-description-${counter}`]: PropTypes.string.tag({
            group: `${counter} - Configurar Conteúdo`,
            label: 'Descreva a imagem',
          }),
          ...getLabelPropTypes(counter),
        }
      },
    }),
  }
}
