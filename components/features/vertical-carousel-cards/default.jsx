import '@r7/ui-card/style.css'
import React, { useState, useId } from 'react'
import PropTypes from '@arc-fusion/prop-types'
import { RESIZER_TOKEN_VERSION } from 'fusion:environment'
import { Image } from '@wpmedia/arc-themes-components'
import getResizeParamsFromANSImage from '../../../util/get-resize-params-from-ans-image'
import { VerticalCarousel } from '@r7/ui-card'
import { withCard, getCardPropTypes } from '../../../util/card'
import { Swiper, SwiperSlide } from 'swiper/react'

const VerticalCarouselCards = withCard(
  props => {
    const { collection, siteProperties, fusionContext } = props.cardProps
    const { arcSite } = fusionContext
    const { fallbackImage, fallbackImageAlt } = siteProperties
    const [swiper, setSwiper] = useState(null)
    const [isEnd, setIsEnd] = useState(false)
    const [isBeginning, setIsBeginning] = useState(true)
    const swiperId = useId()

    const goNext = () => {
      swiper?.slideNext()
    }

    const goPrev = () => {
      swiper?.slidePrev()
    }

    /** Updates the swiper state (without it the swiper.isEnd is buggy) */
    const handleTransitionEnd = () => {
      setIsEnd(swiper?.isEnd)
      setIsBeginning(swiper?.isBeginning)
    }

    return (
      <VerticalCarousel>
        <Swiper
          id={swiperId}
          loop={false}
          onSwiper={setSwiper}
          onTransitionEnd={handleTransitionEnd}
          spaceBetween={16}
          slidesPerView="auto"
        >
          {collection.map(item => (
            <SwiperSlide key={item._id} style={{ width: 'fit-content' }}>
              <VerticalCarousel.Item>
                <a
                  href={item.canonical_url}
                  title={item.headlines?.basic}
                  style={{ height: '100%' }}
                >
                  <VerticalCarousel.Figure>
                    {item.promo_items?.basic ? (
                      <Image
                        {...getResizeParamsFromANSImage(item.promo_items?.basic, arcSite, 183, [
                          183,
                        ])}
                        data-tb-thumbnail
                        alt={item.promo_items?.basic.alt_text}
                        sizes={[{ isDefault: true, sourceSizeValue: '183px' }]}
                        height={326}
                        resizedOptions={{
                          auth: item.promo_items?.basic.auth[RESIZER_TOKEN_VERSION],
                          smart: true,
                        }}
                      />
                    ) : (
                      <img
                        data-tb-thumbnail
                        src={fallbackImage}
                        alt={fallbackImageAlt}
                        width={183}
                        height={326}
                      />
                    )}
                  </VerticalCarousel.Figure>

                  <VerticalCarousel.TextWrapper>
                    <VerticalCarousel.Title>{item.headlines?.basic}</VerticalCarousel.Title>
                  </VerticalCarousel.TextWrapper>
                </a>
              </VerticalCarousel.Item>
            </SwiperSlide>
          ))}
        </Swiper>

        {!isBeginning && (
          <VerticalCarousel.ArrowLeft
            aria-label="Anterior"
            aria-controls={swiperId}
            onClick={goPrev}
          />
        )}

        {!isEnd && (
          <VerticalCarousel.ArrowRight
            aria-label="Próximo"
            aria-controls={swiperId}
            onClick={goNext}
          />
        )}
      </VerticalCarousel>
    )
  },
  { defaultSize: 10 },
)

VerticalCarouselCards.label = 'Chamadas carousel vertical - R7 Block'

VerticalCarouselCards.propTypes = {
  customFields: PropTypes.shape({ ...getCardPropTypes(0) }),
}

export default VerticalCarouselCards
