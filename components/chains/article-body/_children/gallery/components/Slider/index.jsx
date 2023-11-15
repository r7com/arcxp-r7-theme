import React from 'react'
import { useFusionContext } from 'fusion:context'
import { EffectFade, Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../../shared/get-resize-params-from-ans-image'

export const GallerySlider = ({ elements, thumbsSwiper, slideChangeHandler, className }) => {
  const { arcSite } = useFusionContext()
  return (
    <Swiper
      modules={[Thumbs, Navigation, EffectFade]}
      thumbs={{ swiper: thumbsSwiper }}
      className={`${className}__slider`}
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
      {elements.map(item => {
        return (
          <SwiperSlide key={item._id} className={`${className}__slide`}>
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
