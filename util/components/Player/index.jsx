/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/media-has-caption */
import './index.scss'

import React, { useEffect, useState } from 'react'
import { R7_PLAYER_ASSET } from 'fusion:environment'
import { waitPlayerReady } from './utils/wait-player-ready'

export const R7Player = ({ item }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let playerAssetScript = document.getElementById('r7-player-asset')

    const playerIsReady = async () => {
      await waitPlayerReady()
      setIsLoaded(true)
    }

    const hasScript = playerAssetScript !== null
    if (hasScript) {
      playerIsReady()
    } else {
      const script = document.createElement('script')
      script.id = 'r7-player-asset'
      script.type = 'text/javascript'
      script.src = R7_PLAYER_ASSET
      document.body.appendChild(script)

      script.onload = () => {
        playerIsReady()
      }
    }
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
        className="video-js"
        preload="metadata"
        poster={item.poster}
        data-sprite-url={item.spriteUrl}
        data-player-url={item.playerUrl}
        data-metadata={item.metadata}
        data-player-params={item.playerParams}
        data-arc-video
      >
        <source src={item.urlHls} type="application/vnd.apple.mpegurl"></source>
        <source src={item.urlHls} type="application/x-mpegURL"></source>
        <source src={item.urlMp4} type="video/mp4"></source>
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
