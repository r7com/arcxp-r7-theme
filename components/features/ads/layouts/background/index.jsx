import React from 'react'
import './default.scss'

export function Background({ children }) {
  return (
    <div className="ads-background">
      <span className="ads-background__text">Publicidade</span>
      {children}
    </div>
  )
}
