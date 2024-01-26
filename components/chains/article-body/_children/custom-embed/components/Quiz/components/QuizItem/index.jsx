import React, { useContext } from 'react'
import { QuizItemOption } from '../QuizItemOption'
import { QuizItemImage } from '../QuizItemImage'
import { QuizItemAnswer } from '../QuizItemAnswer'
import { QuizContext } from '../../context'

export const QuizItem = ({ className, item, order, showAnswer }) => {
  const { text, answers, register_summary, _id } = item
  const { selectedAnswers } = useContext(QuizContext)
  return (
    <li className={className}>
      <p className={`${className}-order`}>{order}</p>
      <h4 className={`${className}-heading`}>{text}</h4>
      <QuizItemImage className={className} item={item} />
      <ul className={`${className}-options`}>
        {answers.map(answer => (
          <QuizItemOption
            key={answer._id}
            className={className}
            option={answer}
            questionId={_id}
            showAnswer={showAnswer}
          />
        ))}
      </ul>
      {selectedAnswers[_id] && showAnswer && (
        <QuizItemAnswer
          className={className}
          isCorrect={selectedAnswers[_id].correct}
          summary={register_summary}
        />
      )}
    </li>
  )
}
