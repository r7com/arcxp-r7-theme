import React from 'react'
import { Thumbs } from 'swiper'
import { Swiper } from 'swiper/react'

export const GalleryThumbs = ({ children, setThumbsSwiper, className }) => {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={5}
      breakpoints={{
        320: { slidesPerView: 4 },
        769: { slidesPerView: 5 },
      }}
      className={className}
      modules={[Thumbs]}
      watchSlidesProgress
      onSwiper={setThumbsSwiper}
    >
      {children}
    </Swiper>
  )
}
