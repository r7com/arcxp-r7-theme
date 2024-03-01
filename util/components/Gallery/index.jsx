import './index.scss'
import React, { useState, useEffect } from 'react'
import { GalleryThumbs } from './components/Thumbs'
import { GalleryCaption } from './components/Caption'
import { GalleryToolbar } from './components/Toolbar'
import { GallerySlider } from './components/Slider'
import { GalleryFullscreen } from '../FullscreenGallery'
import { useFusionContext } from 'fusion:context'

export const Gallery = ({ elements, className }) => {
  const { globalContent } = useFusionContext()
  const { website } = globalContent
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    fullscreen
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll')
  }, [fullscreen])

  return (
    <div className={`${className} gallery__container`}>
      <div className={`gallery__slider-wrapper`}>
        <GallerySlider
          className={`gallery`}
          slideChangeHandler={setActiveSlideIndex}
          thumbsSwiper={thumbsSwiper}
          elements={elements}
        />
        <GalleryToolbar
          setFullscreen={setFullscreen}
          className={`gallery__slider-toolbar`}
          currentSlide={activeSlideIndex + 1}
          slidesAmount={elements.length}
        />
      </div>
      <GalleryThumbs
        setThumbsSwiper={setThumbsSwiper}
        className={`gallery__thumbs`}
        elements={elements}
      />
      <GalleryCaption
        className={`gallery__caption`}
        title={elements[activeSlideIndex]?.headlines?.basic}
        credits={
          elements[activeSlideIndex]?.credits?.by?.length
            ? elements[activeSlideIndex]?.credits?.by[0]?.name
            : ''
        }
      />
      <GalleryFullscreen
        initialSlide={activeSlideIndex}
        setFullscreen={setFullscreen}
        className={`gallery__overlay`}
        isOpen={fullscreen}
        elements={elements}
        website={website}
      />
    </div>
  )
}
