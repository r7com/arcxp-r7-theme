import React, { useState } from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import { LazyLoad } from '@wpmedia/arc-themes-components'
import AdUnit from './children/AdUnit'
import { generateInstanceId, getAdObject, getMinHeight, getPageType } from './utils/ad-helper'
import { AdPlaceholder, AdShell } from '@r7/ui-base-components'
import './default.scss'
import { DisabledAdvWarning } from './children/DisableAdvWarning'

export const R7ArcAdDisplay = props => {
  const { config, isAdmin, lazyLoad, propsWithContext } = props
  const { customFields, globalContent, arcSite } = propsWithContext
  const { blockLayout = 'background', display = true, fixed, reserveSpace = true } = customFields
  const showAd = !isAdmin && display
  const pageType = getPageType(propsWithContext)
  const sectionId = pageType === 'home' ? '/' : globalContent?.taxonomy?.primary_section?._id
  const siteId = pageType === 'home' ? arcSite : globalContent?.canonical_website

  const content = useContent({
    source: 'custom-site-service-hierarchy',
    query: { sectionId, siteId },
  })

  const disableAds = JSON.parse(content?.publicidade?.disable_adv || false)
  return (
    <>
      {showAd && !disableAds ? (
        <div className={fixed && 'ad-fixed'}>
          <AdShell layout={blockLayout} minHeight={reserveSpace && getMinHeight(customFields)}>
            <LazyLoad
              enabled={lazyLoad}
              offsetBottom={0}
              offsetLeft={0}
              offsetRight={0}
              offsetTop={500}
              renderPlaceholder={ref => <div ref={ref} />}
            >
              <AdUnit adConfig={config} featureConfig={propsWithContext} />
            </LazyLoad>
          </AdShell>
        </div>
      ) : null}
      {isAdmin && display ? (
        <div>
          {disableAds && <DisabledAdvWarning />}
          <AdShell layout={blockLayout}>
            <AdPlaceholder />
          </AdShell>
        </div>
      ) : null}
    </>
  )
}

const AdsR7 = props => {
  const fusionContext = useFusionContext()
  const [instanceId] = useState(() => generateInstanceId(fusionContext.id || '0000'))
  const propsWithContext = {
    ...fusionContext,
    ...props,
    instanceId,
  }
  const { customFields, isAdmin } = propsWithContext
  const { lazyLoad = true } = customFields
  const [config] = useState(
    getAdObject({
      ...customFields,
      ...propsWithContext,
    }),
  )

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
    pos: PropTypes.string.tag({
      label: 'Pos',
    }),
    context: PropTypes.string.tag({
      label: 'Context',
    }),
    lazyLoad: PropTypes.boolean.tag({
      name: 'Ativar lazyload',
      defaultValue: true,
    }),
    reserveSpace: PropTypes.boolean.tag({
      name: 'Reservar espaço',
      description:
        'Reserva espaço na página de acordo com a altura da menor publicidade. Isso aumenta a estabilidade visual da página (CLS)',
      defaultValue: true,
    }),
    fixed: PropTypes.boolean.tag({
      name: 'Fixar no scroll',
      defaultValue: false,
    }),
    display: PropTypes.boolean.tag({
      name: 'Exibir publicidade',
      defaultValue: true,
    }),
  }),
}

AdsR7.label = 'Publicidade – R7 Block'
AdsR7.icon = 'arc-ads'

export default AdsR7
