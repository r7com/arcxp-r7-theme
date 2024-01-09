import PropTypes from '@arc-fusion/prop-types'
import { repeatProptypeStructure } from '../repeat-proptypes-structure'
import { getLabelPropTypes } from './get-label-props'

/**
 * getCardPropTypes
 *
 * Includes the following fields:
 * - Exibir bloco (checkbox)
 * - Exibir label
 * - ..campos "label"
 * - Exibir oferecido por
 * - ..campos "oferecido por"
 * - Configurar conteúdo (collection)
 */
export function getCardPropTypes(cards = 1) {
  return {
    config: PropTypes.contentConfig().tag({
      group: 'Configurar conteúdo',
      label: 'Fonte de conteúdo',
    }),
    display: PropTypes.boolean.tag({
      label: 'Exibir bloco',
      defaultValue: true,
    }),
    ...repeatProptypeStructure({
      count: cards,
      shapeTemplate(counter) {
        return getLabelPropTypes(counter)
      },
    }),
  }
}
