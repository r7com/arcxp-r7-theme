import React from 'react'

export const QuizItemOption = ({ option, className }) => {
  return (
    <li className={`${className}-option`}>
      <span className={`${className}-option-radio`}></span>
      <span className={`${className}-option-text`}>{option.text}</span>
    </li>
  )
}
