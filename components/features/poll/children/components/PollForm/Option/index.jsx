import React from 'react'

export const Option = ({ option, className }) => {
  const { image_url, image_title, _id, text } = option
  return (
    <li className={`${className} ${image_url ? 'with-image' : ''}`}>
      {image_url ? <img src={image_url} alt={image_title} /> : null}
      <input type="radio" id={_id} value={_id} />
      <label htmlFor={_id}>{text}</label>
    </li>
  )
}
