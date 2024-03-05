import './index.scss'
import React, { useState, useEffect, useRef } from 'react'
import { GalleryThumbs } from './components/Thumbs'
import { GalleryCaption } from './components/Caption'
import { GalleryToolbar } from './components/Toolbar'
import { GallerySlider } from './components/Slider'
import { GalleryFullscreen } from '../FullscreenGallery'
import { useFusionContext } from 'fusion:context'
import { Button, SvgIcon } from '@r7/ui-base-components'
import { isServerSide } from '@wpmedia/arc-themes-components'
import getProperties from 'fusion:properties'
import { GalleryAdv } from '../GalleryAdv'

export const Gallery = ({ elements, className }) => {
  const { globalContent, arcSite } = useFusionContext()
  const { website, taxonomy } = globalContent
  const siteProperties = getProperties(arcSite)
  const sectionName = taxonomy?.primary_section?.name
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [interationCounter, setInterationCounter] = useState(0)
  const [show, setShowAdv] = useState(false)
  const swiperRef = useRef(null)
  console.log(siteProperties, arcSite)

  useEffect(() => {
    fullscreen
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll')
  }, [fullscreen])

  function handleAdv() {
    setInterationCounter(prev => (prev += 1))
    setShowAdv(interationCounter && interationCounter % 5 === 0)
  }

  return (
    <>
      {
        <div
          className={`${className} gallery__container ${
            show ? 'gallery__container--show-adv' : ''
          }`}
        >
          <div className="gallery__adv" id={`galleryAdv-container-${globalContent?._id}`}>
            {!isServerSide() && (
              <GalleryAdv hash={`/${siteProperties.dfpId}/${siteProperties.hash}`} />
            )}
            <div className="">
              <Button
                type="button"
                className="gallery__adv-button"
                size="small"
                onClick={() => {
                  setShowAdv(false)
                }}
              >
                Fechar anúncio
                <SvgIcon iconName="close" />
              </Button>
            </div>
          </div>

          <div className={`gallery__slider-wrapper`}>
            <GallerySlider
              className={`gallery`}
              slideChangeHandler={setActiveSlideIndex}
              thumbsSwiper={thumbsSwiper}
              elements={elements}
              handleAdv={handleAdv}
              swiperRef={swiperRef}
            />
            <GalleryToolbar
              setFullscreen={setFullscreen}
              className={`gallery__slider-toolbar`}
              currentSlide={activeSlideIndex + 1}
              slidesAmount={elements.length}
            />
          </div>
          <GalleryThumbs
            setThumbsSwiper={setThumbsSwiper}
            className={`gallery__thumbs`}
            elements={elements}
          />

          <GalleryCaption
            className={`gallery__caption`}
            title={elements[activeSlideIndex]?.caption}
            credits={elements[activeSlideIndex]?.creditIPTC}
          />
          <GalleryFullscreen
            initialSlide={activeSlideIndex}
            setFullscreen={setFullscreen}
            className={`gallery__overlay`}
            isOpen={fullscreen}
            elements={elements}
            website={sectionName || website}
          />
        </div>
      }
    </>
  )
}
