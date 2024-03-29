import './default.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

export const ArticleTags = () => {
  const { arcSite, globalContent } = useFusionContext()
  const { primaryColor } = getProperties(arcSite)
  const BLOCK_CLASS_NAME = 'b-article-tags'

  if (globalContent.taxonomy?.tags && globalContent.taxonomy?.tags?.length) {
    return (
      <div className={`${BLOCK_CLASS_NAME}-container`}>
        <ul className={`${BLOCK_CLASS_NAME}-list`}>
          <span
            className={`${BLOCK_CLASS_NAME}-divider`}
            style={{ backgroundColor: primaryColor }}
          ></span>
          {globalContent.taxonomy.tags.map(tag => (
            <li
              key={tag.slug}
              className={`${BLOCK_CLASS_NAME}-item`}
              style={{ backgroundColor: primaryColor }}
            >
              <span>{tag.text}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return null
}

ArticleTags.label = 'Article Tags - R7 Block'

ArticleTags.icon = 'tags'

export default ArticleTags
