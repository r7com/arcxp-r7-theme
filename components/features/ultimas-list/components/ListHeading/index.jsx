import React from 'react'

export const SimpleListHeading = ({ className, title, primaryColor }) => {
  return (
    <div className={`${className}__header-container`}>
      <p className={`${className}__header-text`} style={{ color: primaryColor }}>
        {title}
      </p>
      <span
        className={`${className}__header-divider`}
        style={{ backgroundColor: primaryColor }}
      ></span>
    </div>
  )
}
