import './default.scss'
import React from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

const HeaderImage = props => {
  const { arcSite } = useFusionContext()
  const { websiteDomain } = getProperties(arcSite)
  const { imageUrl, imageAlt } = props.customFields

  const BLOCK_CLASS_NAME = 'b-header-image'

  return (
    <>
      {imageUrl && (
        <div className={BLOCK_CLASS_NAME}>
          <a href={websiteDomain}>
            <img src={imageUrl} alt={imageAlt} />
          </a>
        </div>
      )}
    </>
  )
}

HeaderImage.propTypes = {
  customFields: PropTypes.shape({
    imageUrl: PropTypes.string,
    imageAlt: PropTypes.string,
  }),
}

HeaderImage.label = 'Header Image - R7 Block'

export default HeaderImage
