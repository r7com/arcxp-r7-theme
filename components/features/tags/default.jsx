import './default.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { Text } from '@r7/ui-base-components'

export const ArticleTags = () => {
  const { arcSite, globalContent } = useFusionContext()
  const { primaryColor } = getProperties(arcSite)
  const BLOCK_CLASS_NAME = 'b-article-tags'

  if (globalContent.taxonomy.tags.length) {
    return (
      <div className={`${BLOCK_CLASS_NAME}-container`}>
        <span
          className={`${BLOCK_CLASS_NAME}-divider`}
          style={{ backgroundColor: primaryColor }}
        ></span>
        <ul className={`${BLOCK_CLASS_NAME}-list`}>
          {globalContent.taxonomy.tags.map(tag => (
            <li
              key={tag.slug}
              className={`${BLOCK_CLASS_NAME}-item`}
              style={{ backgroundColor: primaryColor }}
            >
              <Text as="span" fontSize="xxxs" color="">
                {tag.text}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

ArticleTags.label = 'Article Tags - R7 Block'

ArticleTags.icon = 'tags'

export default ArticleTags
