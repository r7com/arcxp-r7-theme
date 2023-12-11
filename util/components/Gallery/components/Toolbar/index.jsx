import React from 'react'
import { Paragraph } from '@r7/ui-base-components'

export const GalleryToolbar = ({ className, currentSlide, slidesAmount, setFullscreen }) => {
  return (
    <div className={className}>
      <Paragraph as="p" fontSize="xs" fontWeight="semibold">
        {currentSlide} / {slidesAmount}
      </Paragraph>
      <div>
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
