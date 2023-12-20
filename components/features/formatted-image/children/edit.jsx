/* eslint-disable no-undef */
import './index.scss'
import React, { useState, useEffect, useRef } from 'react'
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils'
import { imageFormats } from '../constants'

const Edit = () => {
  const [imageId, setImageId] = useState(null)
  const [format, setFormat] = useState(null)
  const [payload, setPayload] = useState({})
  const iframeRef = useRef(null)
  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    })
    const data = ComposerHandler.getPayload()
    setImageId(data?.config?.imageId)
    setFormat(data?.config?.imageFormat)
    setPayload(data)

    const iframeElement = iframeRef.current

    if (iframeElement) {
      iframeElement.addEventListener('load', handleIframeLoad)

      return () => {
        iframeElement.removeEventListener('load', handleIframeLoad)
      }
    }
  }, [])

  async function handleIframeClick(e) {
    Array.from(this.querySelectorAll('.image-tile')).map(item => {
      if (item.classList.contains('selected')) {
        item.classList.replace('selected', 'not-selected')
      }
    })
    const element = e.target
    if (element.classList.contains('image-well')) {
      const imageTile = element.parentNode.parentNode
      const image = element.querySelector('.medium-image-tile.card-img-top')
      if (image) {
        imageTile.classList.replace('not-selected', 'selected')
        const imageId = image.getAttribute('src').split('/public/')[1].split('.')[0]
        setImageId(imageId)
      }
    }
  }

  const handleIframeLoad = () => {
    const iframeContent = iframeRef.current.contentWindow.document
    if (iframeContent) {
      iframeContent.body.addEventListener('click', handleIframeClick)

      return () => {
        iframeContent.body.removeEventListener('click', handleIframeClick)
      }
    }
  }

  const handleSelectorChange = value => {
    setFormat(value)
  }

  const save = () => {
    const ansCustomEmbed = {
      ...payload,
      config: {
        imageFormat:
          format === payload?.config?.imageFormat ? payload?.config?.imageFormat : format,
        imageId: imageId === payload?.config?.imageId ? payload?.config?.imageId : imageId,
      },
    }
    ComposerHandler.sendMessage('data', ansCustomEmbed)
  }

  const cancel = () => {
    ComposerHandler.sendMessage('cancel')
  }
  return (
    <div className="custom-embed-container">
      <div className="custom-embed-container__iframe">
        <iframe
          ref={iframeRef}
          id="iframe-photo-center"
          title="Photo center iframe"
          width="500"
          height="500"
          src="https://sandbox.newr7.arcpublishing.com/photo/v2/"
        ></iframe>
      </div>
      <div className="custom-embed-container__toolbar">
        <div className="custom-embed-container__toolbar-select">
          <label htmlFor="image-format-selector">Choose a format:</label>
          <select
            name="image-formats"
            id="image-format-selector"
            onChange={e => {
              handleSelectorChange(e.target.value)
            }}
          >
            {imageFormats.map(item => (
              <option key={item} value={item} selected={item === format}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="custom-embed-container__toolbar-btns">
          <input onClick={cancel} className="btn" type="button" id="cancel-btn" value="Cancel" />
          <input
            onClick={save}
            disabled={
              imageId === payload?.config?.imageId && format === payload?.config?.imageFormat
            }
            className="btn"
            type="button"
            id="apply-btn"
            value="Apply"
          />
        </div>
      </div>
    </div>
  )
}

Edit.lazy = true
export default Edit
