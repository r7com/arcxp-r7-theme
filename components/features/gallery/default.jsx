import React from 'react'
import { useFusionContext } from 'fusion:context'
import { Gallery as GalleryWidget } from '../../../util/components/Gallery'
import { useArticleAction } from '@r7/ui-article-delivery'

const Gallery = () => {
  const { fontSize } = useArticleAction()
  const BLOCK_CLASS_NAME = 'b-gallery'
  const {
    globalContent: { content_elements = {} },
  } = useFusionContext()
  const images = content_elements.filter(element => element.type === 'image')
  return (
    <div style={{ '--font-size': `${fontSize}` }}>
      <GalleryWidget elements={images} className={BLOCK_CLASS_NAME} />
    </div>
  )
}

Gallery.label = 'Gallery - R7 Block'
Gallery.lazy = true

export default Gallery
