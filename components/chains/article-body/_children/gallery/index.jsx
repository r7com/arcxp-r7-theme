import React from 'react'
import { Gallery as GalleryWidget } from '../../../../../util/components/Gallery'

const Gallery = ({ element, classPrefix }) => {
  const { content_elements } = element
  return <GalleryWidget elements={content_elements} className={classPrefix} />
}

export default Gallery
