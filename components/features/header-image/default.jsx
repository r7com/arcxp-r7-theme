import './default.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'
import { getSiteTopperProp } from './util/getSiteTopperProp'

const HeaderImage = () => {
  const { arcSite, globalContent } = useFusionContext()
  const { websiteDomain, primaryColor, headerImage } = getProperties(arcSite)

  const sectionContent =
    globalContent?.node_type === 'section'
      ? globalContent
      : useContent({
          source: 'site-service-hierarchy',
          query: {
            hierarchy: '',
            sectionId: globalContent.websites?.[arcSite].website_section._id,
          },
        })
  const sectionHeaderImage =
    getSiteTopperProp('section_header_image', sectionContent) || headerImage
  let sectionPrimaryColor =
    getSiteTopperProp('section_primary_color', sectionContent) || primaryColor

  if (sectionPrimaryColor) {
    sectionPrimaryColor = sectionPrimaryColor.replace('#', '')
  }

  const BLOCK_CLASS_NAME = 'b-header-image'
  const BLOCK_STYLE = {
    backgroundImage: `url(${sectionHeaderImage})${
      sectionPrimaryColor
        ? `, linear-gradient(to right, #${sectionPrimaryColor} 0%,#${sectionPrimaryColor} 50%,#${sectionPrimaryColor} 50%,#${sectionPrimaryColor} 100%)`
        : ''
    }`,
    backgroundSize: sectionPrimaryColor ? 'auto 100%' : 'cover',
  }
  return (
    <>
      {sectionHeaderImage && (
        <a href={websiteDomain}>
          <div className={BLOCK_CLASS_NAME} style={BLOCK_STYLE}></div>
        </a>
      )}
    </>
  )
}

HeaderImage.label = 'Header Image - R7 Block'

export default HeaderImage
