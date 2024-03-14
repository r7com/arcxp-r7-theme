import React from 'react'
import { useFusionContext } from 'fusion:context'
import { Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../../get-resize-params-from-ans-image'
import { Ad } from '../../../../ads/components/Ad'
import { Button, SvgIcon } from '@r7/ui-base-components'

export const FullscreenSlider = ({
  swiperRef,
  setActiveSlideIndex,
  className,
  view,
  views,
  elements,
  initialSlide,
  setThumbsSwiper,
  showAdv,
  handleAdv,
  setShowAdv,
}) => {
  const { arcSite, id } = useFusionContext()

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
        handleAdv()
      }}
      initialSlide={initialSlide}
      navigation
      loop={true}
      watchSlidesProgress
      onSwiper={setThumbsSwiper}
    >
      <div className={`${className}-adv ${showAdv ? `${className}-show-adv` : ''}`}>
        <span className={`${className}-text`}>Publicidade</span>
        <div className={`${className}-adv-content`}>
          <Ad
            id={`gallery-fullscreen-${id}`}
            pos="Galeria1_Imagem"
            context="Galeria"
            dimensions={[
              [
                [300, 250],
                [660, 470],
              ],
              [
                [660, 470],
                [771, 420],
              ],
              [300, 250],
            ]}
          />
        </div>
        <Button
          className={`${className}-adv-button`}
          color="tertiary"
          onClick={() => setShowAdv(false)}
        >
          Fechar anúncio <SvgIcon iconName="close" size="small" />
        </Button>
      </div>
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
