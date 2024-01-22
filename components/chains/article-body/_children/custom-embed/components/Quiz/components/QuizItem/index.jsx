import React from 'react'
import { QuizItemOption } from '../QuizItemOption'
import { QuizItemImage } from '../QuizItemImage'
import { QuizItemAnswer } from '../QuizItemAnswer'

export const QuizItem = ({ className, item, order }) => {
  const { question, options, answer } = item
  return (
    <li className={className}>
      <p className={`${className}-order`}>{order}</p>
      <h4 className={`${className}-heading`}>{question}</h4>
      <QuizItemImage className={className} item={item} />
      <ul className={`${className}-options`}>
        {options.map(option => (
          <QuizItemOption key={option.id} text={option.text} className={className} />
        ))}
      </ul>
      <QuizItemAnswer className={className} answer={answer} />
    </li>
  )
}
