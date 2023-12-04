import React from 'react'
import { useFusionContext } from 'fusion:context'
import { Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../../../get-resize-params-from-ans-image'

export const FullscreenSlider = ({
  swiperRef,
  setActiveSlideIndex,
  className,
  view,
  views,
  elements,
}) => {
  const { arcSite } = useFusionContext()
  return (
    <Swiper
      ref={swiperRef}
      modules={[Thumbs, Navigation]}
      className={`${className}-slider ${view === views.gallery ? 'active' : ''}`}
      slidesPerView={1}
      breakpoints={{
        320: { allowTouchMove: true },
        769: { allowTouchMove: false },
      }}
      onSlideChange={e => {
        setActiveSlideIndex(e.realIndex)
      }}
      navigation
      loop={true}
    >
      {elements.map(item => {
        return (
          <SwiperSlide key={item._id} className={`${className}-slide`}>
            <Image
              {...getResizeParamsFromANSImage(item, arcSite, 800, [400, 600, 800, 1600])}
              alt={item.alt_text}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
