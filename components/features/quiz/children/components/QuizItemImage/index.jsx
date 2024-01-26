import React from 'react'

export const QuizItemImage = ({ item, className }) => {
  const { text, image_url, image_title, image_author } = item
  if (image_url && image_url.length) {
    return (
      <figure className={`${className}-image`}>
        <img src={image_url} alt={text} />
        {image_title && image_author ? (
          <figcaption className={`${className}-image-content`}>
            <p>{image_title}</p>
            <p>{image_author}</p>
          </figcaption>
        ) : null}
      </figure>
    )
  }
  return null
}
