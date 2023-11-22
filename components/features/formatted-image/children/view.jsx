/* eslint-disable no-undef */
import '../index.scss'
import React, { useEffect, useState } from 'react'
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils'

const View = () => {
  const [imageFormat, setImageFormat] = useState('')
  const [imageAnsData, setImageAnsData] = useState({})
  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    })
    const data = ComposerHandler.getPayload()
    setImageFormat(data?.config?.imageFormat)
    setImageAnsData(data?.config?.imageAnsData)
  }, [])

  return (
    <div className="custom-embed-container view">
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
