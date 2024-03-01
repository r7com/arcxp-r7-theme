/* eslint-disable jsx-a11y/click-events-have-key-events*/
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
import React from 'react'
import { useFusionContext } from 'fusion:context'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../../get-resize-params-from-ans-image'

export const FullscreenGrid = ({
  className,
  view,
  views,
  elements,
  setView,
  swiperRef,
  setActiveSlideIndex,
}) => {
  const { arcSite } = useFusionContext()
  const gallery = swiperRef.current?.swiper

  return (
    <ul className={`${className}-grid ${view === views.grid ? 'active' : ''}`}>
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
  )
}
