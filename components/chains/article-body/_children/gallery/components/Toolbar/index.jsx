import { Text } from '@r7/ui-base-components'
import React from 'react'

export const GalleryToolbar = ({ className, currentSlide, slidesAmount }) => {
  return (
    <div className={className}>
      <Text as="p" fontSize="xs" fontWeight="semibold">
        {currentSlide} / {slidesAmount}
      </Text>
    </div>
  )
}
