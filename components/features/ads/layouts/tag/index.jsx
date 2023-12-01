import React from 'react'
import './default.scss'

export function Tag({ children }) {
  return (
    <div className="ads-tag">
      <span className="ads-tag__text">Publicidade</span>
      <div className="ads-tag__content">{children}</div>
    </div>
  )
}
