import React from 'react'
import { useFusionContext } from 'fusion:context'
import { Gallery as GalleryWidget } from '../../../util/components/Gallery'

const Gallery = () => {
  const BLOCK_CLASS_NAME = 'b-gallery'
  const {
    globalContent: { content_elements = {} },
  } = useFusionContext()
  const images = content_elements.filter(element => element.type === 'image')
  return <GalleryWidget elements={images} className={BLOCK_CLASS_NAME} />
}

Gallery.label = 'Gallery - R7 Block'

export default Gallery
