/* eslint-disable jsx-a11y/anchor-has-content */
import './default.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useSiteSectionProp } from '../../../util/useSiteTopperProp'

const HeaderImage = () => {
  const { arcSite, globalContent } = useFusionContext()
  const { websiteDomain, primaryColor, headerImage } = getProperties(arcSite)
  const articleSectionId = globalContent?.websites
    ? globalContent.websites[arcSite].website_section._id
    : null
  const sectionHeaderImage =
    useSiteSectionProp(
      'site_topper.section_header_image',
      articleSectionId || globalContent['_id'],
    ) || headerImage
  let sectionPrimaryColor =
    useSiteSectionProp(
      'site_topper.section_primary_color',
      articleSectionId || globalContent['_id'],
    ) || primaryColor

  if (sectionPrimaryColor) {
    sectionPrimaryColor = sectionPrimaryColor.replace('#', '')
  }

  const BLOCK_CLASS_NAME = 'b-header'
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
        <div className={`${BLOCK_CLASS_NAME}-image`} style={BLOCK_STYLE}>
          <a className={`${BLOCK_CLASS_NAME}-link`} target="_self" href={websiteDomain} />
        </div>
      )}
    </>
  )
}

HeaderImage.label = 'Header Image - R7 Block'

export default HeaderImage
