import './default.scss'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { isServerSide, LazyLoad } from '@wpmedia/arc-themes-components'
import { SimpleList } from './components/List'

const BLOCK_CLASS_NAME = 'b-ultimas-list'

const getFallbackImageURL = ({ deployment, contextPath, fallbackImage }) => {
  let targetFallbackImage = fallbackImage

  if (!targetFallbackImage.includes('http')) {
    targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`)
  }

  return targetFallbackImage
}

const SimpleListWrapper = ({ customFields }) => {
  const { id, arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const { websiteDomain, fallbackImage, primaryLogoAlt, primaryColor } = getProperties(arcSite)

  const targetFallbackImage = getFallbackImageURL({
    deployment,
    contextPath,
    fallbackImage,
  })

  if (customFields.lazyLoad && isServerSide() && !isAdmin) {
    return null
  }

  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <SimpleList
        id={id}
        className={BLOCK_CLASS_NAME}
        customFields={customFields}
        targetFallbackImage={targetFallbackImage}
        websiteDomain={websiteDomain}
        arcSite={arcSite}
        primaryColor={primaryColor}
        primaryLogoAlt={primaryLogoAlt}
      />
    </LazyLoad>
  )
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
    title: PropTypes.string.tag({ label: 'Title' }),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description:
        'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
}

SimpleListWrapper.label = 'Ultimas List – R7 Block'

SimpleListWrapper.icon = 'arc-list'

export default SimpleListWrapper
