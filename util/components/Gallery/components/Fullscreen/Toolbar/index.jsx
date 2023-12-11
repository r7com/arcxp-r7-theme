import React, { useState } from 'react'
import { Paragraph } from '@r7/ui-base-components'
import { SocialShare } from '@r7/ui-article-delivery'

export const FullscreenToolbar = ({ className, elements, currentSlide }) => {
  const [showCaption, setShowCaption] = useState(false)
  const [viewMore, setViewMore] = useState(false)
  return (
    <div className={`${className}-caption ${showCaption ? 'active' : ''}`}>
      <div className={`${className}-caption-toolbar`}>
        <div className={`${className}-caption-toolbar-title`}>
          <Paragraph as="p" fontSize="little" fontWeight="semibold">
            LEGENDA
          </Paragraph>
          <button
            onClick={() => {
              setShowCaption(prev => !prev)
            }}
            className={`${showCaption ? 'active' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffffff">
              <g>
                <path
                  d="M0 8c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8zm7.452-3.674L3.08 8.696c-.304.304-.304.794 0 1.094l.548.549c.303.303.794.303 1.094 0L8 7.06l3.277 3.278c.304.303.794.303 1.094 0l.548-.549c.304-.303.304-.793 0-1.093L8.55 4.326c-.304-.303-.794-.303-1.097 0z"
                  transform="translate(-281 -587) translate(1 565) translate(209 16) rotate(180 43.5 11)"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        <div className={`${className}-caption-toolbar-btns ${viewMore ? 'view-more' : ''}`}>
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
            className={`${className}-caption-toolbar-more`}
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
        </div>
      </div>
      <div className={`${className}-caption-content`}>
        <Paragraph as="p" fontSize="xxs" fontWeight="semibold">
          {currentSlide + 1} / {elements.length}
        </Paragraph>
        <Paragraph as="p" fontSize="xxs">
          {elements[currentSlide]?.headlines?.basic}
        </Paragraph>
        <Paragraph as="p" fontSize="little">
          {elements[currentSlide]?.credits?.by.length
            ? elements[currentSlide]?.credits?.by[0].name
            : ''}
        </Paragraph>
      </div>
    </div>
  )
}
