import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import { LazyLoad } from '@wpmedia/arc-themes-components'
import { AdPlaceholder, AdShell } from '@r7/ui-base-components'
import '@r7/ui-base-components/style.css'

function Ads({ customFields }) {
  const { lazyload, blockLayout, display } = customFields
  const { isAdmin } = useFusionContext()

  const layout = {
    background: (
      <AdShell layout="background">
        {isAdmin ? (
          <AdPlaceholder />
        ) : (
          <LazyLoad
            enabled={lazyload}
            offsetBottom={0}
            offsetLeft={0}
            offsetRight={0}
            offsetTop={200}
            renderPlaceholder={ref => <div data-testid="lazy-load-placeholder" ref={ref} />}
          >
            <p>adhere</p>
          </LazyLoad>
        )}
      </AdShell>
    ),
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
    desktopSizes: PropTypes.string.tag({
      label: 'Tamanhos no desktop',
      description:
        'Inserir os tamanhos no formato [larguraxaltura], se for apenas um tamanho, ou [[larguraxaltura], ... [larguraxaltura]], se forem múltiplos tamanhos.',
    }),
    mobileSizes: PropTypes.string.tag({
      label: 'Tamanhos no mobile',
      description:
        'Inserir os tamanhos no formato [larguraxaltura], se for apenas um tamanho, ou [[larguraxaltura], ... [larguraxaltura]], se forem múltiplos tamanhos.',
    }),
    display: PropTypes.boolean.tag({
      label: 'Exibir publicidade',
    }),
    lazyload: PropTypes.boolean.tag({
      name: 'Lazy Load',
      defaultValue: true,
    }),
  }),
}

export default Ads
