import React from 'react'
import { useFusionContext } from 'fusion:context'
import { Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import getResizeParamsFromANSImage from '../../../../../../../util/get-resize-params-from-ans-image'
import { Image } from '@wpmedia/arc-themes-components'

export const GalleryThumbs = ({ elements, setThumbsSwiper, className }) => {
  const { arcSite } = useFusionContext()
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={5}
      breakpoints={{
        320: { slidesPerView: 4 },
        769: { slidesPerView: 5 },
      }}
      className={`${className}-slider`}
      modules={[Thumbs]}
      watchSlidesProgress
      onSwiper={setThumbsSwiper}
    >
      {elements.map(item => {
        return (
          <SwiperSlide key={item._id} className={`${className}-slide`}>
            <Image
              {...getResizeParamsFromANSImage(item, arcSite, item.width, [200])}
              alt={item.alt_text}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
