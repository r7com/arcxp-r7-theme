import './index.scss'
import React from 'react'

export const SocialShareWrapper = ({ children, className = '' }) => {
  return <div className={`social-share-wrapper ${className}`}>{children}</div>
}
