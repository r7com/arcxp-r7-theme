import './index.scss'
import React, { useState, useRef } from 'react'
import { FullscreenHeader } from './Header'
import { FullscreenSlider } from './Slider'
import { FullscreenGrid } from './Grid'
import { FullscreenToolbar } from './Toolbar'

export const GalleryFullscreen = ({ elements, className, isOpen, setFullscreen }) => {
  const views = {
    gallery: 'gallery',
    grid: 'grid',
  }
  const [view, setView] = useState(views.gallery)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const swiperRef = useRef(null)
  return (
    <div className={`${className} ${isOpen ? 'active' : ''}`}>
      <div className={`${className}-wrapper`}>
        <FullscreenHeader
          className={className}
          setFullscreen={setFullscreen}
          setView={setView}
          view={view}
          views={views}
        />
        <div className={`${className}-content`}>
          <div className={`${className}-content-container`}>
            <FullscreenSlider
              elements={elements}
              className={className}
              view={view}
              views={views}
              swiperRef={swiperRef}
              setActiveSlideIndex={setActiveSlideIndex}
            />
            <FullscreenGrid
              elements={elements}
              setView={setView}
              className={className}
              view={view}
              views={views}
              swiperRef={swiperRef}
              setActiveSlideIndex={setActiveSlideIndex}
            />
          </div>
        </div>
        {view === views.gallery && (
          <FullscreenToolbar
            className={className}
            currentSlide={activeSlideIndex}
            elements={elements}
          />
        )}
      </div>
    </div>
  )
}
