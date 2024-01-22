import React from 'react'

export const QuizItemImage = ({ item, className }) => {
  const { question, image_url, image_title, image_descr } = item
  if (image_url && image_url.length) {
    return (
      <figure className={`${className}-image`}>
        <img src={image_url} alt={question} />
        {image_title && image_descr ? (
          <figcaption className={`${className}-image-content`}>
            <p>{image_title}</p>
            <p>{image_descr}</p>
          </figcaption>
        ) : null}
      </figure>
    )
  }
  return null
}
