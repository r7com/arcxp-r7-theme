import React, { useContext } from 'react'
import { QuizContext } from '../../context'

export const QuizItemAnswer = ({ className, isCorrect, summary }) => {
  const { primaryColor } = useContext(QuizContext)
  return (
    <div className={`${className}-answer`} style={{ borderLeft: `12px solid ${primaryColor}` }}>
      <h5 className={`${className}-answer-title ${isCorrect ? 'correct' : 'incorrect'}`}>
        <span></span>
        {isCorrect ? 'Muito bom você acertou!' : 'Você não acertou :('}
      </h5>
      <p className={`${className}-answer-text`}>{summary}</p>
    </div>
  )
}
