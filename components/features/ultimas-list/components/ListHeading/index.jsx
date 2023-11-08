import React from 'react'
import { Text } from '@r7/ui-base-components'

export const SimpleListHeading = ({ className, title, primaryColor }) => {
  return (
    <div className={`${className}__header-container`}>
      <Text as="h2" fontSize="xxl" fontWeight="light">
        <span className={`${className}__header-text`} style={{ color: primaryColor }}>
          {title}
        </span>
      </Text>
      <span
        className={`${className}__header-divider`}
        style={{ backgroundColor: primaryColor }}
      ></span>
    </div>
  )
}
