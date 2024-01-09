import './default.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { isServerSide, LazyLoad } from '@wpmedia/arc-themes-components'
import { UltimasList } from './components/List'

const BLOCK_CLASS_NAME = 'b-ultimas'

function Ultimas({ customFields }) {
  const { arcSite, isAdmin, globalContent } = useFusionContext()
  const { websiteDomain, primaryLogoAlt, primaryColor } = getProperties(arcSite)

  if (customFields.lazyLoad && isServerSide() && !isAdmin) {
    return null
  }

  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <UltimasList
        storyId={globalContent._id}
        className={BLOCK_CLASS_NAME}
        customFields={customFields}
        websiteDomain={websiteDomain}
        arcSite={arcSite}
        primaryColor={primaryColor}
        primaryLogoAlt={primaryLogoAlt}
      />
    </LazyLoad>
  )
}

Ultimas.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed').tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: true,
      description:
        'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
}

Ultimas.label = 'Ultimas - R7 Block'

export default Ultimas
