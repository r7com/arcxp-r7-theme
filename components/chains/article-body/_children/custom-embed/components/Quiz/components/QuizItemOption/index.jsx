import React from 'react'

export const QuizItemOption = ({ text, className }) => {
  return (
    <li className={`${className}-option incorrect`}>
      <span className={`${className}-option-radio`}></span>
      <span className={`${className}-option-text`}>{text}</span>
    </li>
  )
}
