import React from 'react'

export const QuizItemAnswer = ({ className, answer }) => {
  const { text, title } = answer
  return (
    <div className={`${className}-answer`}>
      <h5 className={`${className}-answer-title incorrect`}>
        <span></span>
        {title}
      </h5>
      <p className={`${className}-answer-text`}>{text}</p>
    </div>
  )
}
