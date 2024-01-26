import React from 'react'
import { QuizItemOption } from '../QuizItemOption'
import { QuizItemImage } from '../QuizItemImage'

export const QuizItem = ({ className, item, order }) => {
  const { text, answers } = item
  return (
    <li className={className}>
      <p className={`${className}-order`}>{order}</p>
      <h4 className={`${className}-heading`}>{text}</h4>
      <QuizItemImage className={className} item={item} />
      <ul className={`${className}-options`}>
        {answers.map(answer => (
          <QuizItemOption key={answer._id} className={className} option={answer} />
        ))}
      </ul>
    </li>
  )
}
