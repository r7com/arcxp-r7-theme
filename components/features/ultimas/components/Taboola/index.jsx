import React from 'react'
import { isR7Home } from '../../../../../util/global-helpers'

export const TaboolaCard = ({ websiteName, isAdmin, className }) => {
  const counter = Math.ceil(Math.random() * 100000000)
  const ENV = isR7Home(websiteName)
    ? {
        placement: '',
        container: '',
      }
    : {
        placement: 'Capas Internas',
        container: '-capas-internas',
      }

  const taboolaConfig = {
    mode: 'thumbnails-1x1-mid-article',
    container: `taboola-ultimas-noticias-widget-organico${ENV.container}-${counter}`,
    placement: `Ultimas noticias widget organico${ENV.placement} - ${counter}`,
    target_type: 'mix',
  }

  isR7Home(websiteName) ? (taboolaConfig.homepage = 'auto') : (taboolaConfig.category = 'auto')

  if (!isAdmin) {
    window._taboola = window._taboola || []
    window._taboola.push(taboolaConfig)
  }

  return (
    <div
      className={`${className}__item`}
      id={`taboola-ultimas-noticias-widget-organico${ENV.container}-${counter}`}
    >
      {isAdmin ? 'Taboola Card' : ''}
    </div>
  )
}
