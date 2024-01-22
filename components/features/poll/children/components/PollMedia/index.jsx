import React from 'react'
import { MediaItem, Video } from '@wpmedia/arc-themes-components'
export const PollMedia = ({ item, className }) => {
  return (
    <div className={`${className}-media`}>
      {item.main_media === 'image' ? (
        <figure className={`${className}-media-image`}>
          <img src={item.default_image_url} alt={item.title} />
        </figure>
      ) : (
        <MediaItem>
          <Video className={`${className}-media-video`} embedMarkup={item.default_embed} />
        </MediaItem>
      )}
    </div>
  )
}
