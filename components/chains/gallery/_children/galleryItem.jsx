import React from 'react'
import { Image } from '../../../../util/components/Image'
import { SocialShare } from '@r7/ui-article-delivery'
import { ExpandableSocialShare } from '../../../../util/components/ExpandableSocialShare'

export const GalleryItem = ({
  item,
  itemIndex,
  className,
  customFields,
  setFullscreen,
  setActiveSlide,
}) => {
  return (
    <Image
      item={item}
      customFields={customFields}
      className={`${className}`}
      anchor={`#foto/${itemIndex + 1}`}
    >
      <div className={`${className}-toolbar`}>
        <ExpandableSocialShare>
          <SocialShare>
            <SocialShare.List>
              <SocialShare.Item name="facebook" link="#facebook" title="facebook" />
              <SocialShare.Item name="linkedin" link="#linkedin" title="linkedin" />
              <SocialShare.Item name="twitter" link="#twitter" title="twitter" />
              <SocialShare.Item name="whatsapp" link="#whatsapp" title="whatsapp" />
              <SocialShare.Item name="googleNews" link="#googlenews" title="google-news" />
              <SocialShare.Item name="share" link="#share" title="share" />
            </SocialShare.List>
          </SocialShare>
        </ExpandableSocialShare>
        <button
          className={`${className}-toolbar-expand`}
          onClick={() => {
            setFullscreen(true)
            setActiveSlide(itemIndex)
          }}
        >
          <svg viewBox="0 0 18 18">
            <path d="M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"></path>
          </svg>
        </button>
      </div>
      <div className={`${className}-overlay`}></div>
    </Image>
  )
}
