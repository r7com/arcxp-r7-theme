import PropTypes from '@arc-fusion/prop-types'

/**
 * Get's all centralized custom fields for CardLabel and Sposored by
 * @param {Object} options - Params
 * @param {number} options.length - Cards quantity
 * @param {Object} options.customFields - Arc customFields from component prop
 */
export function getLabelCustomFields({ length, customFields }) {
  return [...Array(length).keys()].map(index => {
    const indexStartingWithOne = index + 1
    return {
      displayLabel: customFields[`displayLabel${indexStartingWithOne}`],
      label: customFields[`label${indexStartingWithOne}`],
      sponsoredBy: customFields[`sponsoredBy${indexStartingWithOne}`],
      sponsoredByImage: customFields[`sponsoredByImage${indexStartingWithOne}`],
      sponsoredByTitle: customFields[`sponsoredByTitle${indexStartingWithOne}`],
      sponsoredByImageDesc: customFields[`sponsoredByImageDesc${indexStartingWithOne}`],
      sponsoredByUrl: customFields[`sponsoredByUrl${indexStartingWithOne}`],
    }
  })
}

/**
 * Centralizes all custom fields for Cards like CardLabel and Sposored by
 * @param {number} field - How many cards we want to render
 */
export function getLabelPropTypes(field) {
  return {
    [`displayLabel${field}`]: PropTypes.boolean.tag({
      group: `${field}. Label`,
      label: 'Exibir label',
      defaultValue: true,
    }),
    [`label${field}`]: PropTypes.oneOf([
      'automatic',
      'live',
      'blog',
      'studio',
      'voting',
      'podcast',
      'aclr',
    ]).tag({
      group: `${field}. Label`,
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
    [`sponsoredBy${field}`]: PropTypes.boolean.tag({
      label: 'Exibir oferecido por',
      group: `${field}. Oferecido por`,
    }),
    [`sponsoredByImage${field}`]: PropTypes.string.tag({
      group: `${field}. Oferecido por`,
      label: 'Imagem (24px largura)',
      searchable: 'image',
    }),
    [`sponsoredByImageDesc${field}`]: PropTypes.string.tag({
      group: `${field}. Oferecido por`,
      label: 'Descrição da imagem (alt)',
      description: 'Descreva o que você vê na imagem',
    }),
    [`sponsoredByTitle${field}`]: PropTypes.string.tag({
      group: `${field}. Oferecido por`,
      label: 'Titulo',
      description: 'Descreva o conteúdo do link destino',
    }),
    [`sponsoredByUrl${field}`]: PropTypes.string.tag({
      group: `${field}. Oferecido por`,
      label: 'URL (https)',
    }),
  }
}
