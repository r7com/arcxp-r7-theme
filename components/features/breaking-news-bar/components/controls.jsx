import React from 'react'

export function SliderControls({ swiper }) {
  return (
    <div className="breaking-news-bar__controls">
      <button className="control-button prev" onClick={() => swiper.slidePrev()}>
        <span className="visually-hidden">prev</span>
      </button>
      <button className="control-button next" onClick={() => swiper.slideNext()}>
        <span className="visually-hidden">next</span>
      </button>
    </div>
  )
}
