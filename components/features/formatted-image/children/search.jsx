import './index.scss'
import React, { useState, useEffect, useRef } from 'react'
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils'
import { imageFormats } from '../constants'

const Search = () => {
  const [imageId, setImageId] = useState('')
  const [format, setFormat] = useState('full')
  const iframeRef = useRef(null)

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    })

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

  const handleSelectorChange = e => {
    setFormat(e.target.value)
  }

  const save = () => {
    const ansStarter = ComposerHandler.getStarterPowerUpANS()
    const ansCustomEmbed = {
      ...ansStarter,
      config: {
        imageId: imageId,
        imageFormat: format,
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
          <select name="image-formats" id="image-format-selector" onChange={handleSelectorChange}>
            {imageFormats.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="custom-embed-container__toolbar-btns">
          <input onClick={cancel} className="btn" type="button" id="cancel-btn" value="Cancel" />
          <input
            disabled={!imageId}
            onClick={save}
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

Search.lazy = true
export default Search
