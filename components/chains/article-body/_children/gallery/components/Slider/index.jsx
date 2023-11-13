import React from 'react'
import { EffectFade, Navigation, Thumbs } from 'swiper'
import { Swiper } from 'swiper/react'

export const GallerySlider = ({ children, thumbsSwiper, slideChangeHandler, className }) => {
  return (
    <Swiper
      modules={[Thumbs, Navigation, EffectFade]}
      thumbs={{ swiper: thumbsSwiper }}
      className={className}
      effect="fade"
      slidesPerView={1}
      breakpoints={{
        320: { allowTouchMove: true },
        769: { allowTouchMove: false },
      }}
      navigation
      loop={true}
      onSlideChange={e => {
        slideChangeHandler(e.realIndex)
      }}
    >
      {children}
    </Swiper>
  )
}
