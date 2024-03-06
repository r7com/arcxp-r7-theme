/* eslint-disable jsx-a11y/anchor-has-content */
import './default.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useSiteSectionProp } from '../../../util/useSiteTopperProp'

const HEADER_IMAGE = 'site_topper.section_header_image'
const HEADER_LEFT_COLOR = 'site_topper.section_left_color_top'
const HEADER_RIGHT_COLOR = 'site_topper.section_right_color_top'

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
  const sectionLeftColor = useSiteSectionProp(HEADER_LEFT_COLOR, sectionId)
  const sectionRightColor = useSiteSectionProp(HEADER_RIGHT_COLOR, sectionId)

  if (sectionHeaderImage) {
    return {
      sectionHeaderImage: sectionHeaderImage,
      leftGradientColor: sectionLeftColor,
      rightGradientColor: sectionRightColor,
      sectionId,
    }
  }
  return null
}

const HeaderImage = () => {
  const { arcSite, globalContent } = useFusionContext()
  const { websiteDomain, headerImage } = getProperties(arcSite)
  const sectionLeftColor = globalContent?.site_topper?.section_left_color_top
  const sectionRightColor = globalContent?.site_topper?.section_right_color_top

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

  let { sectionHeaderImage, sectionId, leftGradientColor, rightGradientColor } =
    recursivelyGetHeaderImage(allSectionIds) || {
      sectionHeaderImage: headerImage,
      leftGradientColor: sectionLeftColor,
      rightGradientColor: sectionRightColor,
      sectionId: websiteDomain,
    }

  const BLOCK_CLASS_NAME = 'b-header'
  const BLOCK_STYLE = {
    backgroundImage: `url(${sectionHeaderImage})${
      leftGradientColor
        ? `, linear-gradient(to right, ${leftGradientColor} 0%, ${leftGradientColor} 50%,${rightGradientColor} 50%,${rightGradientColor} 100%)`
        : ''
    }`,
    backgroundSize: rightGradientColor ? 'auto 100%' : 'cover',
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
HeaderImage.static = true

export default HeaderImage
