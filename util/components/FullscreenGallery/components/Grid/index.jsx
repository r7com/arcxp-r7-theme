/* eslint-disable jsx-a11y/click-events-have-key-events*/
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
import React from 'react'
import { useFusionContext } from 'fusion:context'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../../get-resize-params-from-ans-image'
import { Ad } from '../../../../ads/components/Ad'

export const FullscreenGrid = ({
  className,
  view,
  views,
  elements,
  setView,
  swiperRef,
  setActiveSlideIndex,
}) => {
  const { arcSite, id } = useFusionContext()
  const gallery = swiperRef.current?.swiper

  return (
    <div className={`${className}-grid-wrapper ${view === views.grid ? 'active' : ''}`}>
      <ul className={`${className}-grid `}>
        {elements.map((item, index) => {
          return (
            <li
              key={item._id}
              className={`${className}-grid-item`}
              onClick={() => {
                gallery?.slideToLoop(index)
                setActiveSlideIndex(index)
                setView(views.gallery)
              }}
            >
              <Image
                {...getResizeParamsFromANSImage(item, arcSite, 800, [400, 600, 800, 1600])}
                alt={item.alt_text}
              />
            </li>
          )
        })}
      </ul>
      <div className={`${className}-grid-adv`}>
        <span className={`${className}-grid-text`}>publicidade</span>
        <Ad id={`gallery-grid-${id}`} pos="Galeria1_Imagem" context="Galeria" />
      </div>
    </div>
  )
}
