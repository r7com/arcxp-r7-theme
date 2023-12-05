import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import { Background } from './layouts/background'
import { Placeholder } from './layouts/placeholder'
import { Lines } from './layouts/lines'
import { Tag } from './layouts/tag'

function Ads({ customFields }) {
  const { blockLayout, display } = customFields
  const { isAdmin } = useFusionContext()

  const layout = {
    background: (
      <Background>
        {isAdmin && <Placeholder />}
        background
      </Background>
    ),
    lines: (
      <Lines>
        {isAdmin && <Placeholder />}
        lines
      </Lines>
    ),
    tag: (
      <Tag>
        {isAdmin && <Placeholder />}
        tag
      </Tag>
    ),
    none: <>{isAdmin && <Placeholder />}</>,
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
