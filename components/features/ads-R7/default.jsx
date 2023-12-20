import React, { useState } from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import { LazyLoad } from '@wpmedia/arc-themes-components'
import AdUnit from './children/AdUnit'
import { getAdObject } from './utils/ad-helper'
import { AdPlaceholder, AdShell } from '@r7/ui-base-components'
import '@r7/ui-base-components/style.css'

function generateInstanceId(componentId) {
  return `${componentId}-${Math.floor(Math.random() * 9007199254740991).toString(16)}`
}

export const R7ArcAdDisplay = props => {
  const { config, isAdmin, lazyLoad, propsWithContext } = props

  console.log({ propsWithContext })
  const { customFields } = propsWithContext
  const { blockLayout = 'background', display = true } = customFields
  const showAd = !isAdmin && display

  return (
    <>
      {showAd ? (
        <AdShell layout={blockLayout}>
          <LazyLoad
            enabled={lazyLoad}
            offsetBottom={0}
            offsetLeft={0}
            offsetRight={0}
            offsetTop={200}
            renderPlaceholder={ref => <div ref={ref} />}
          >
            <AdUnit adConfig={config} featureConfig={propsWithContext} />
          </LazyLoad>
        </AdShell>
      ) : null}
      {isAdmin && display ? (
        <AdShell layout={blockLayout}>
          <AdPlaceholder />
        </AdShell>
      ) : null}
    </>
  )
}

const AdsR7 = props => {
  console.log({ props })
  const fusionContext = useFusionContext()
  const [instanceId] = useState(() => generateInstanceId(fusionContext.id || '0000'))
  const propsWithContext = {
    ...fusionContext, // siteProperties: { dfpId } included in fusionContext
    ...props,
    instanceId,
  }
  const { customFields, isAdmin } = propsWithContext
  const { lazyLoad = true, reserveSpace = true } = customFields
  const [config] = useState(
    getAdObject({
      ...customFields,
      ...propsWithContext,
    }),
  )
  //pegar o min height e fazer o reserve space

  console.log(reserveSpace)
  return (
    <R7ArcAdDisplay
      config={config}
      isAdmin={isAdmin}
      lazyLoad={lazyLoad}
      propsWithContext={propsWithContext}
    />
  )
}

/** PropTypes */
AdsR7.propTypes = {
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
        'Inserir os tamanhos no formato larguraxaltura, separados por , (vírgula). Ex.: largura1xaltura1, largura2xaltura2.',
    }),
    tabletSizes: PropTypes.string.tag({
      label: 'Tamanhos no tablet',
      description:
        'Inserir os tamanhos no formato larguraxaltura, separados por , (vírgula). Ex.: largura1xaltura1, largura2xaltura2.',
    }),
    mobileSizes: PropTypes.string.tag({
      label: 'Tamanhos no mobile',
      description:
        'Inserir os tamanhos no formato larguraxaltura, separados por , (vírgula). Ex.: largura1xaltura1, largura2xaltura2.',
    }),
    lazyLoad: PropTypes.boolean.tag({
      name: 'Lazy Load Ad?',
      defaultValue: true,
    }),
    reserveSpace: PropTypes.boolean.tag({
      name: 'Reserve space for Ad',
      defaultValue: true,
    }),
    display: PropTypes.boolean.tag({
      name: 'Exibir publicidade',
      defaultValue: true,
    }),
  }),
}

AdsR7.label = 'AdsR7 – R7 Block'
AdsR7.icon = 'arc-ads'

export default AdsR7
