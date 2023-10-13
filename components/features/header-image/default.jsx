import './default.scss'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

const HeaderImage = props => {
  const { arcSite } = useFusionContext()
  const { websiteDomain, primaryColor } = getProperties(arcSite)
  const { imageUrl, color, usePrimary } = props.customFields

  let bgColor = usePrimary ? primaryColor : color

  if (bgColor) {
    bgColor = bgColor.replace('#', '')
  }
  const BLOCK_CLASS_NAME = 'b-header-image'
  const BLOCK_STYLE = {
    backgroundImage: `url(${imageUrl})${
      bgColor
        ? `, linear-gradient(to right, #${bgColor} 0%,#${bgColor} 50%,#${bgColor} 50%,#${bgColor} 100%)`
        : ''
    }`,
    backgroundSize: bgColor ? 'contain' : 'cover',
  }
  return (
    <>
      {imageUrl && (
        <a href={websiteDomain}>
          <div className={BLOCK_CLASS_NAME} style={BLOCK_STYLE}></div>
        </a>
      )}
    </>
  )
}

HeaderImage.propTypes = {
  customFields: PropTypes.shape({
    imageUrl: PropTypes.string.tag({
      label: 'URL of the bg image',
    }),
    color: PropTypes.string.tag({
      label: 'Hex color code for bg color',
    }),
    usePrimary: PropTypes.boolean.tag({
      label: 'Use primary color for bg color',
    }),
  }),
}

HeaderImage.label = 'Header Image - R7 Block'

export default HeaderImage
