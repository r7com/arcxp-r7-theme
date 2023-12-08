import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import { AdPlaceholder, AdShell } from '@r7/ui-base-components'
import '@r7/ui-base-components/style.css'

function Ads({ customFields }) {
  const { blockLayout, display } = customFields
  const { isAdmin } = useFusionContext()

  const layout = {
    background: <AdShell layout="background">{isAdmin && <AdPlaceholder />}</AdShell>,
    lines: <AdShell layout="lines">{isAdmin && <AdPlaceholder />}</AdShell>,
    tag: <AdShell layout="tag">{isAdmin && <AdPlaceholder />}</AdShell>,
    none: <AdShell>{isAdmin && <AdPlaceholder />}</AdShell>,
  }[blockLayout]

  return (
    <>
      {display
        ? layout
        : isAdmin && <p>Este bloco está oculto. Mude suas configurações para exibí-lo.</p>}
    </>
  )
}

Ads.label = 'Publicidade - R7 Block'
Ads.icon = 'arc-ads'

Ads.propTypes = {
  customFields: PropTypes.shape({
    blockLayout: PropTypes.oneOf(['background', 'lines', 'tag', 'none']).tag({
      label: 'Estilo da publicidade',
      defaultValue: 'background',
      labels: {
        background: 'Fundo cinza',
        lines: 'Linhas',
        tag: 'Tag publicidade acima',
        none: 'Nenhum',
      },
    }),
    display: PropTypes.boolean.tag({
      label: 'Exibir publicidade',
    }),
  }),
}

export default Ads
