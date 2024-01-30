/* eslint-disable jsx-a11y/media-has-caption */
import './index.scss'

import React, { useEffect, useState } from 'react'
import { VIDEO_DATA } from './mocks/VIDEO_DATA'
import { R7_PLAYER_ASSET } from 'fusion:environment'

export const EmbedPlayer = ({ item }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    // script.src = 'https://player.r7.com/index.js'
    // script.src = 'http://localhost:8181/index.js'
    script.src = R7_PLAYER_ASSET
    script.onload = () => {
      setIsLoaded(true)
    }
    document.body.appendChild(script)
  }, [])

  return (
    <div
      className={`wrapper-video ${isLoaded ? 'show' : ''}`}
      style={{
        visibility: 'hidden',
      }}
    >
      <video
        controls
        id="r7-player"
        className="r7-player video-js"
        preload="metadata"
        poster={item.config.poster}
        data-sprite-url={VIDEO_DATA.spriteUrl}
        data-player-url={item.config.playerUrl}
        data-metadata={item.config.metadata}
        data-player-params={VIDEO_DATA.playerParams}
      >
        <source src={item.config.url} type="application/vnd.apple.mpegurl"></source>
        <source src={item.config.url} type="application/x-mpegURL"></source>
        <source src={item.config.url} type="video/mp4"></source>
      </video>
      <noscript>
        <p className="vjs-no-js">
          Para ver este vídeo, ative o JavaScript ou considere uma atualização para um navegador da
          Web que suporte vídeo HTML5
        </p>
      </noscript>
    </div>
  )
}
