/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/media-has-caption */

import React, { useEffect } from 'react'
import { VIDEO_DATA } from './mocks/VIDEO_DATA'

export const EmbedPlayer = ({ item }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://player.r7.com/index.js'
    // script.src = 'http://localhost:8181/index.js'

    document.body.appendChild(script)
  }, [])

  return (
    <div className="wrapper-video">
      <video
        controls
        id="r7-player"
        className="r7-player video-js"
        preload="metadata"
        poster={item.config.poster}
        sprite_url={VIDEO_DATA.spriteUrl}
        player_url={item.config.playerUrl}
        metadata={JSON.stringify(item.config.metadata)}
        player_params={VIDEO_DATA.playerParams}
      >
        <source src={item.config.url} type="application/vnd.apple.mpegurl"></source>
        <source src={item.config.url} type="application/x-mpegURL"></source>
        <source src={item.config.url} type="video/mp4"></source>
      </video>
      <noscript>
        <p class="vjs-no-js">
          Para ver este vídeo, ative o JavaScript ou considere uma atualização para um navegador da
          Web que suporte vídeo HTML5
        </p>
      </noscript>
    </div>
  )
}
