import { Text } from '@r7/ui-base-components'
import React from 'react'

export const GalleryCaption = ({ className, caption = '', credits = '' }) => {
  return (
    <div className={className}>
      <Text as="p" fontSize="xxs">
        {caption}
      </Text>
      <Text as="p" fontSize="little">
        {credits}
      </Text>
    </div>
  )
}
