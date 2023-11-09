import './index.scss'
import React, { useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../shared/get-resize-params-from-ans-image'

import { GalleryThumbs } from './components/Thumbs'
import { GalleryCaption } from './components/Caption'
import { GalleryToolbar } from './components/Toolbar'
import { GallerySlider } from './components/Slider'

export const Gallery = ({ element, arcSite, classPrefix }) => {
  const { content_elements } = element
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const BLOCK_CLASS_NAME = `${classPrefix}-gallery`
  return (
    <div className={`${BLOCK_CLASS_NAME}__container`}>
      <div className={`${BLOCK_CLASS_NAME}__slider-wrapper`}>
        <GallerySlider
          className={`${BLOCK_CLASS_NAME}__slider`}
          slideChangeHandler={setActiveSlideIndex}
          thumbsSwiper={thumbsSwiper}
        >
          {content_elements.map(item => {
            return (
              <SwiperSlide key={item._id} className={`${BLOCK_CLASS_NAME}__slide`}>
                <Image
                  {...getResizeParamsFromANSImage(item, arcSite, 800, [400, 600, 800, 1600])}
                  alt={item.alt_text}
                />
              </SwiperSlide>
            )
          })}
        </GallerySlider>
        <GalleryToolbar
          className={`${BLOCK_CLASS_NAME}__slider-toolbar`}
          currentSlide={activeSlideIndex + 1}
          slidesAmount={content_elements.length}
        />
      </div>
      <GalleryThumbs
        setThumbsSwiper={setThumbsSwiper}
        className={`${BLOCK_CLASS_NAME}__thumbs-container`}
      >
        {content_elements.map(item => {
          return (
            <SwiperSlide key={item._id} className={`${BLOCK_CLASS_NAME}__thumbs-slide`}>
              <Image
                {...getResizeParamsFromANSImage(item, arcSite, 800, [400, 600, 800, 1600])}
                alt={item.alt_text}
              />
            </SwiperSlide>
          )
        })}
      </GalleryThumbs>
      <GalleryCaption
        className={`${BLOCK_CLASS_NAME}__caption`}
        caption={content_elements[activeSlideIndex]?.caption}
        credits={
          content_elements[activeSlideIndex]?.credits?.by.length
            ? content_elements[activeSlideIndex]?.credits?.by[0]?.name
            : ''
        }
      />
    </div>
  )
}
