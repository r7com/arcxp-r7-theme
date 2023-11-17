/* eslint-disable no-undef*/
import './index.scss'
import React, { useState } from 'react'
import { GalleryThumbs } from './components/Thumbs'
import { GalleryCaption } from './components/Caption'
import { GalleryToolbar } from './components/Toolbar'
import { GallerySlider } from './components/Slider'
import { GalleryFullscreen } from './components/Fullscreen'

export const Gallery = ({ element, classPrefix }) => {
  const { content_elements } = element
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const BLOCK_CLASS_NAME = classPrefix

  fullscreen ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'auto')
  return (
    <div className={`${BLOCK_CLASS_NAME}__container`}>
      <div className={`${BLOCK_CLASS_NAME}__slider-wrapper`}>
        <GallerySlider
          className={BLOCK_CLASS_NAME}
          slideChangeHandler={setActiveSlideIndex}
          thumbsSwiper={thumbsSwiper}
          elements={content_elements}
        />
        <GalleryToolbar
          setFullscreen={setFullscreen}
          className={`${BLOCK_CLASS_NAME}__slider-toolbar`}
          currentSlide={activeSlideIndex + 1}
          slidesAmount={content_elements.length}
        />
      </div>
      <GalleryThumbs
        setThumbsSwiper={setThumbsSwiper}
        className={`${BLOCK_CLASS_NAME}__thumbs`}
        elements={content_elements}
      />
      <GalleryCaption
        className={`${BLOCK_CLASS_NAME}__caption`}
        caption={content_elements[activeSlideIndex]?.caption}
        credits={
          content_elements[activeSlideIndex]?.credits?.by.length
            ? content_elements[activeSlideIndex]?.credits?.by[0]?.name
            : ''
        }
      />
      <GalleryFullscreen
        setFullscreen={setFullscreen}
        className={`${BLOCK_CLASS_NAME}__overlay`}
        isOpen={fullscreen}
        elements={content_elements}
      />
    </div>
  )
}
