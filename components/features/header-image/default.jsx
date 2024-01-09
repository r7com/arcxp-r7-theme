/* eslint-disable jsx-a11y/anchor-has-content */
import './default.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useSiteSectionProp } from '../../../util/useSiteTopperProp'

const HEADER_IMAGE = 'site_topper.section_header_image'
const HADER_COLOR = 'site_topper.section_primary_color'

const recursivelyGetHeaderImage = sections => {
  for (let index = 0; index < sections.length; index++) {
    const element = fetchData(sections[index])
    if (element) {
      return element
    }
  }
  return null
}

function fetchData(sectionId) {
  const sectionHeaderImage = useSiteSectionProp(HEADER_IMAGE, sectionId)
  const sectionHeaderColor = useSiteSectionProp(HADER_COLOR, sectionId)
  if (sectionHeaderImage) {
    return {
      sectionHeaderImage: sectionHeaderImage,
      sectionPrimaryColor: sectionHeaderColor,
      sectionId,
    }
  }
  return null
}

const HeaderImage = () => {
  const { arcSite, globalContent } = useFusionContext()
  const { websiteDomain, primaryColor, headerImage } = getProperties(arcSite)

  const storySections = globalContent?.taxonomy
    ? globalContent.taxonomy.sections.map(el => el._id)
    : []

  const moreThanTwoSections = globalContent?.ancestors
    ? [...globalContent.ancestors.default, globalContent._id].reverse()
    : []

  const sections =
    !globalContent?.taxonomy && !globalContent?.ancestors && globalContent?.parent
      ? [
          globalContent?._id || '',
          globalContent.parent.default === '/' ? '' : globalContent.parent.default,
        ]
      : []

  const allSectionIds = [...storySections, ...moreThanTwoSections, ...sections]

  let { sectionHeaderImage, sectionPrimaryColor, sectionId } = recursivelyGetHeaderImage(
    allSectionIds,
  ) || {
    sectionHeaderImage: headerImage,
    sectionPrimaryColor: primaryColor,
    sectionId: websiteDomain,
  }

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
          <a className={`${BLOCK_CLASS_NAME}-link`} target="_self" href={sectionId} />
        </div>
      )}
    </>
  )
}

HeaderImage.label = 'Header Image - R7 Block'

export default HeaderImage
