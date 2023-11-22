import React from 'react'
import { useContent } from 'fusion:content'
import { Text } from '@r7/ui-base-components'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'

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
          <Text fontSize="little" as="p">
            <span className={`${className}__item-section-name`}>{sectionName}</span>
          </Text>
          <Text fontSize="xxs" as="p" fontWeight="semibold">
            {relatedStory?.headlines?.basic}
          </Text>
        </a>
      </li>
    )
  }
}
