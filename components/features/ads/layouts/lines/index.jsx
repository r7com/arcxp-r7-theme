import './default.scss'
import React from 'react'

export function Lines({ children }) {
  return (
    <div className="ads-lines">
      <div className="ads-lines__wrapper">
        <span className="ads-lines__line"></span>
        <span className="ads-lines__text">Continua após a publicidade</span>
        <span className="ads-lines__line"></span>
      </div>
      <div className="ads-lines__content">{children}</div>
    </div>
  )
}
