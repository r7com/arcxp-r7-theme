import React from 'react'

export function SliderNavigation({ bars, swiper, currentSlide }) {
  return (
    <nav className="breaking-news-bar__navigation" aria-label="Paginação da Barra Urgente">
      {bars.map((_, index) => {
        const isNavActive = Boolean(index === currentSlide)

        return (
          <button
            key={index}
            className={`nav-button ${isNavActive ? 'nav-button--active' : ''}`}
            onClick={() => swiper.slideTo(index)}
            aria-label={`Barra ${index + 1} ${isNavActive ? '(Atual)' : ''}`}
          >
            <span className="visually-hidden">{index}</span>
          </button>
        )
      })}
    </nav>
  )
}
