import { Text } from '@r7/ui-base-components'
import React from 'react'

export const GalleryCaption = ({ className, title = '', credits = '' }) => {
  return (
    <div className={className}>
      <Text as="p" fontSize="xxs">
        {title}
      </Text>
      <Text as="p" fontSize="little">
        {credits}
      </Text>
    </div>
  )
}
