import React from 'react'
import { useContent } from 'fusion:content'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../chains/article-body/shared/get-resize-params-from-ans-image'

export const RelatedItem = ({ item, className, arcSite }) => {
  const relatedStory = useContent({
    source: 'content-api',
    query: { _id: item._id },
  })
  const sectionName = relatedStory?.websites[arcSite]?.website_section?.name
  if (relatedStory?.promo_items?.basic) {
    return (
      <li className={`${className}__item`}>
        <a href={relatedStory?.website_url} target="_blank" rel="noreferrer">
          <div className={`${className}__item-image`}>
            <Image
              {...getResizeParamsFromANSImage(relatedStory?.promo_items?.basic, arcSite, 220, [])}
              alt={relatedStory?.promo_items?.basic?.alt_text}
            />
          </div>
          <p className={`${className}__item-section-name`}>{sectionName}</p>
          <p className={`${className}__item-title`}>{relatedStory?.headlines?.basic}</p>
        </a>
      </li>
    )
  }
  return null
}
