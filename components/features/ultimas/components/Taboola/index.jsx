import React from 'react'
import { isR7Home } from '../../../../../util/global-helpers'
import { getSectionPropsContent } from '../../../../../util/get-section-props-content'

let ids = []

export const TaboolaCard = ({ websiteName, isAdmin, className, id }) => {
  const sectionPropsContent = getSectionPropsContent()
  const disableTaboola = JSON.parse(sectionPropsContent?.publicidade?.disable_taboola || false)
  const configIds = isR7Home(websiteName)
    ? {
        placement: '',
        container: '',
      }
    : {
        placement: 'Capas Internas',
        container: '-capas-internas',
      }

  const idExists = ids.includes(id)

  if (!isAdmin && !idExists) {
    const taboolaConfig = {
      mode: 'thumbnails-1x1-mid-article',
      container: `taboola-ultimas-noticias-widget-organico${configIds.container}-${id}`,
      placement: `Ultimas noticias widget organico${configIds.placement} - ${id}`,
      target_type: 'mix',
    }

    isR7Home(websiteName) ? (taboolaConfig.homepage = 'auto') : (taboolaConfig.category = 'auto')
    window._taboola = window._taboola || []
    window._taboola.push(taboolaConfig)
    ids.push(id)
  }

  return (
    <>
      {!disableTaboola && (
        <div
          className={`${className}__item`}
          id={`taboola-ultimas-noticias-widget-organico${configIds.container}-${id}`}
        >
          {isAdmin ? 'Taboola Card' : ''}
        </div>
      )}
    </>
  )
}
