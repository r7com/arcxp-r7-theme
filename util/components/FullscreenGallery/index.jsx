import './index.scss'
import React, { useState, useRef } from 'react'
import { FullscreenHeader } from './components/Header'
import { FullscreenSlider } from './components/Slider'
import { FullscreenGrid } from './components/Grid'
import { FullscreenToolbar } from './components/Toolbar'

export const GalleryFullscreen = ({ elements, className, isOpen, setFullscreen, initialSlide }) => {
  const views = {
    gallery: 'gallery',
    grid: 'grid',
  }
  const [view, setView] = useState(views.gallery)
  const [activeSlideIndex, setActiveSlideIndex] = useState(initialSlide)
  const swiperRef = useRef(null)
  if (!isOpen) {
    return null
  }
  return (
    <div className={`${className}`}>
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
              initialSlide={initialSlide}
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
