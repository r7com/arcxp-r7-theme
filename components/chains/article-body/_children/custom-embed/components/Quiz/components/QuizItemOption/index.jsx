/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

import React, { useContext } from 'react'
import { QuizContext } from '../../context'

export const QuizItemOption = ({ option, className, showAnswer, questionId }) => {
  const { disabled, selectedAnswers, setSelectedAnswers } = useContext(QuizContext)
  const clickHandler = () => {
    if (!disabled && (!selectedAnswers[questionId] || !showAnswer)) {
      setSelectedAnswers(prev => ({ ...prev, [questionId]: option }))
    }
  }

  let answerValidationClass = ''

  if (selectedAnswers?.[questionId]?._id === option._id) {
    if (showAnswer) {
      if (selectedAnswers[questionId].correct) {
        answerValidationClass = 'correct'
      } else {
        answerValidationClass = 'incorrect'
      }
    } else {
      answerValidationClass = 'selected'
    }
  }

  return (
    <li className={`${className}-option ${answerValidationClass}`} onClick={clickHandler}>
      <span className={`${className}-option-radio`}></span>
      <span className={`${className}-option-text`}>{option.text}</span>
    </li>
  )
}
