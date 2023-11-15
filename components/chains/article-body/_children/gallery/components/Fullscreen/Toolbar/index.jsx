import React, { useState } from 'react'
import { Text } from '@r7/ui-base-components'

export const FullscreenToolbar = ({ className, elements, currentSlide }) => {
  const [showCaption, setShowCaption] = useState(false)
  return (
    <div className={`${className}-caption ${showCaption ? 'active' : ''}`}>
      <div className={`${className}-caption-toolbar`}>
        <div>
          <Text as="p" fontSize="little" fontWeight="semibold">
            LEGENDA
          </Text>
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
      </div>
      <div className={`${className}-caption-content`}>
        <Text as="p" fontSize="xxs" fontWeight="semibold">
          {currentSlide + 1} / {elements.length}
        </Text>
        <Text as="p" fontSize="xxs">
          {elements[currentSlide]?.caption}
        </Text>
        <Text as="p" fontSize="little">
          {elements[currentSlide]?.credits?.by.length
            ? elements[currentSlide]?.credits?.by[0].name
            : ''}
        </Text>
      </div>
    </div>
  )
}
