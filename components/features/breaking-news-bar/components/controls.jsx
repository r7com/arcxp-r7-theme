import React from 'react'
import { SvgIcon } from '@r7/ui-base-components'

export function SliderControls({ swiper }) {
  return (
    <div className="breaking-news-bar__controls">
      <button className="control-button prev" onClick={() => swiper.slidePrev()}>
        <span className="visually-hidden">anterior</span>
        <SvgIcon iconName="chevron-left" size="small" />
      </button>
      <button className="control-button next" onClick={() => swiper.slideNext()}>
        <span className="visually-hidden">próximo</span>
        <SvgIcon iconName="chevron-right" size="small" />
      </button>
    </div>
  )
}
