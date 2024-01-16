import React from 'react'

export const Option = ({ option, className, selectedOptionId, handleRadioSubmit }) => {
  const { image_url, image_title, _id, text } = option
  return (
    <li className={`${className} ${image_url ? 'with-image' : ''}`}>
      {image_url ? <img src={image_url} alt={image_title} /> : null}
      <input
        type="radio"
        id={_id}
        value={_id}
        checked={selectedOptionId === _id}
        onChange={handleRadioSubmit}
      />
      <label htmlFor={_id}>{text}</label>
    </li>
  )
}
