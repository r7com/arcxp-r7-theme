import React, { useState } from 'react'
import { Paragraph } from '@r7/ui-base-components'
import { SocialShare } from '@r7/ui-article-delivery'

export const GalleryToolbar = ({ className, currentSlide, slidesAmount, setFullscreen }) => {
  const [viewMore, setViewMore] = useState(false)
  return (
    <div className={className}>
      <Paragraph as="p" fontSize="xs" fontWeight="semibold">
        {currentSlide} / {slidesAmount}
      </Paragraph>
      <div className={`${className}-btns ${viewMore ? 'view-more' : ''}`}>
        <SocialShare>
          <SocialShare.List>
            <SocialShare.Item name="googleNews" link="#googlenews" title="google-news" />
            <SocialShare.Item name="facebook" link="#facebook" title="facebook" />
            <SocialShare.Item name="twitter" link="#twitter" title="twitter" />
            <SocialShare.Item name="whatsapp" link="#whatsapp" title="whatsapp" />
            <SocialShare.Item name="linkedin" link="#linkedin" title="linkedin" />
            <SocialShare.Item name="share" link="#share" title="share" />
          </SocialShare.List>
        </SocialShare>
        <button
          className={`${className}-more`}
          onClick={() => {
            setViewMore(prev => !prev)
          }}
        >
          <svg
            width="17"
            height="6"
            viewBox="0 0 17 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.75 3C10.75 4.24375 9.74375 5.25 8.5 5.25C7.25625 5.25 6.25 4.24375 6.25 3C6.25 1.75625 7.25625 0.75 8.5 0.75C9.74375 0.75 10.75 1.75625 10.75 3ZM14 0.75C12.7563 0.75 11.75 1.75625 11.75 3C11.75 4.24375 12.7563 5.25 14 5.25C15.2437 5.25 16.25 4.24375 16.25 3C16.25 1.75625 15.2437 0.75 14 0.75ZM3 0.75C1.75625 0.75 0.75 1.75625 0.75 3C0.75 4.24375 1.75625 5.25 3 5.25C4.24375 5.25 5.25 4.24375 5.25 3C5.25 1.75625 4.24375 0.75 3 0.75Z"
              fill="#556373"
            />
          </svg>
        </button>
        <button
          className={`${className}-expand`}
          onClick={() => {
            setFullscreen(true)
          }}
        >
          <svg viewBox="0 0 18 18">
            <path d="M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
