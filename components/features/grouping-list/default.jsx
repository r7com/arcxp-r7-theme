import './default.scss'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { isServerSide, LazyLoad } from '@wpmedia/arc-themes-components'
import { SimpleList } from './components/List'

const SimpleListWrapper = ({ customFields }) => {
  const { arcSite, isAdmin, globalContent } = useFusionContext()
  const { websiteDomain, primaryLogoAlt, primaryColor } = getProperties(arcSite)
  const BLOCK_CLASS_NAME = 'b-grouping-list'
  if (customFields.lazyLoad && isServerSide() && !isAdmin) {
    return null
  }

  if (globalContent?.site_topper?.is_grouping === 'true') {
    return (
      <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
        <SimpleList
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
  return null
}

SimpleListWrapper.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed').tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    loadMoreSize: PropTypes.number.tag({
      group: 'Configure Content',
      label: 'Load More Size',
    }),
    hideCaption: PropTypes.bool.tag({
      label: 'Hide Caption',
      defaultValue: false,
      group: 'Display Options',
    }),
  }),
}

SimpleListWrapper.label = 'Grouping List – R7 Block'

SimpleListWrapper.icon = 'arc-list'

export default SimpleListWrapper
