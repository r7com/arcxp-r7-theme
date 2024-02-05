import React from 'react'
import { Paragraph } from '@r7/ui-base-components'

export const GalleryCaption = ({ className, title = '', credits = '' }) => {
  return (
    <div className={className}>
      <Paragraph as="p" fontSize="xxs">
        {title}
      </Paragraph>
      <Paragraph as="p" fontSize="little">
        {credits}
      </Paragraph>
    </div>
  )
}
