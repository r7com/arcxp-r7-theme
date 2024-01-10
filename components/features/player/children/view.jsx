/* eslint-disable no-undef */
import './index.scss'
import React, { useEffect, useState } from 'react'
import { useContent } from 'fusion:content'
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils'

const View = () => {
  const [imageFormat, setImageFormat] = useState('')
  const [imageId, setImageId] = useState(null)
  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    })
    const data = ComposerHandler.getPayload()
    setImageFormat(data?.config?.imageFormat)
    setImageId(data?.config?.imageId)
  }, [])

  const imageAnsData = useContent({
    source: 'photo-api',
    query: { _id: imageId },
  })

  if (!imageAnsData) {
    return null
  }
  return (
    <div className="custom-embed-container view">
      <span>TESTE EMBED VIDEO VIEW</span>
      <img
        className="custom-embed-container__image"
        src={imageAnsData?.url}
        alt={imageAnsData?.alt_text}
      />
      <div className="custom-embed-container__image-content">
        <p className="custom-embed-container__image-title">
          Image ({imageFormat}) | Title &quot;{imageAnsData?.subtitle}&quot;
        </p>
        <p className="custom-embed-container__image-caption">
          <span>Caption: </span>
          {imageAnsData?.caption}
        </p>
      </div>
    </div>
  )
}

View.lazy = true
export default View
