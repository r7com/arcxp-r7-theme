/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import { VIDEO_DATA } from './mocks/VIDEO_DATA'

export const EmbedPlayer = ({ item }) => {
  console.log(item)
  return (
    <video
      controls
      id="my-video"
      className="video-js"
      preload="auto"
      data-setup=""
      poster={VIDEO_DATA.poster}
      sprite_url={VIDEO_DATA.spriteUrl}
      player_url={VIDEO_DATA.playerUrl}
      metadata={VIDEO_DATA.metadata}
      player_params={VIDEO_DATA.playerParams}
    >
      <source src={item.url} type="application/vnd.apple.mpegurl"></source>
    </video>
  )
}
