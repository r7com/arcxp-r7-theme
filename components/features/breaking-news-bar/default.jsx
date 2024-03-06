import '@r7/ui-card/style.css'
import './default.scss'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'

import { repeatProptypeStructure } from '../../../util/repeat-proptypes-structure'
import { filterBars } from './utils/helpers'
import { BreakingNews } from '@r7/ui-card'
import { SliderNavigation } from './components/navigation'
import { SliderControls } from './components/controls'

function BreakingNewsBar({ customFields }) {
  const [swiper, setSwiper] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const bars = filterBars(customFields)

  const activateSwiper = bars.length > 1

  return (
    <div className="breaking-news-bar">
      <Swiper
        className="breaking-news-bar__wrapper"
        modules={[Autoplay]}
        loop={true}
        onSwiper={setSwiper}
        onSlideChange={({ realIndex }) => setCurrentSlide(realIndex)}
        autoplay={
          activateSwiper
            ? {
                delay: 8000,
                disabledOnInteraction: true,
              }
            : false
        }
      >
        {bars.map((bar, index) => (
          <SwiperSlide key={index}>
            <BreakingNews {...bar} />
          </SwiperSlide>
        ))}
      </Swiper>

      {activateSwiper && (
        <>
          <SliderNavigation bars={bars} swiper={swiper} currentSlide={currentSlide} />
          <SliderControls swiper={swiper} />
        </>
      )}
    </div>
  )
}

BreakingNewsBar.label = 'Barra Urgente - R7 Block'
BreakingNewsBar.lazy = true

BreakingNewsBar.propTypes = {
  customFields: PropTypes.shape({
    ...repeatProptypeStructure({
      count: 3,
      shapeTemplate(counter) {
        return {
          [`showBar${counter}`]: PropTypes.bool.tag({
            group: `Barra ${counter}`,
            label: 'Mostrar barra?',
            defaultValue: true,
          }),
          [`theme${counter}`]: PropTypes.oneOf(['live', 'urgent', 'now']).tag({
            group: `Barra ${counter}`,
            label: 'Tema',
            labels: {
              live: 'Ao vivo (padrão)',
              urgent: 'Urgente',
              now: 'Agora',
            },
            defaultValue: 'live',
          }),
          [`tag${counter}`]: PropTypes.string.tag({
            group: `Barra ${counter}`,
            label: 'Tag',
            defaultValue: '',
          }),
          [`title${counter}`]: PropTypes.string.tag({
            group: `Barra ${counter}`,
            label: 'Titulo',
            defaultValue: 'Meu título',
          }),
          [`href${counter}`]: PropTypes.string.tag({
            group: `Barra ${counter}`,
            label: 'Link para noticia',
            defaultValue: '#',
          }),
          [`showImage${counter}`]: PropTypes.bool.tag({
            group: `Barra ${counter}`,
            label: 'Mostrar imagem da barra?',
            defaultValue: false,
          }),
          [`imageUrl${counter}`]: PropTypes.string.tag({
            group: `Barra ${counter}`,
            label: 'Url da imagem',
            defaultValue: '#',
            searchable: 'image',
          }),
          [`imageAlt${counter}`]: PropTypes.string.tag({
            group: `Barra ${counter}`,
            label: 'Alt da imagem',
            defaultValue: 'Alt para imagem',
          }),
        }
      },
    }),
  }),
}

export default BreakingNewsBar
