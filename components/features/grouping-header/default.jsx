import './default.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'

const GroupingHeader = () => {
  const BLOCK_CLASS_NAME = 'b-grouping-header'
  const { arcSite, globalContent } = useFusionContext()
  const { primaryColor } = getProperties(arcSite)

  const headerContent =
    globalContent.node_type && globalContent.node_type === 'section'
      ? globalContent
      : useContent({
          source: 'site-service-hierarchy',
          query: { sectionId: globalContent.websites[arcSite].website_section?._id },
        })

  if (headerContent?.is_grouping === 'true') {
    return (
      <div className={BLOCK_CLASS_NAME}>
        <a
          className={`${BLOCK_CLASS_NAME}__link`}
          href={headerContent._id}
          title={headerContent.name}
        >
          <h3 className={`${BLOCK_CLASS_NAME}__title`} style={{ color: primaryColor }}>
            {headerContent.name}
          </h3>
        </a>
      </div>
    )
  }
  return null
}

GroupingHeader.label = 'Grouping Header - R7 Block'

export default GroupingHeader
