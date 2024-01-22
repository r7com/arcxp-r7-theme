import './index.scss'
import React, { useState, useEffect } from 'react'
import { getQuizData } from './util/getQuizData'
import { quizDataProcesser } from './util/quizDataProcesser'
import { QuizItem } from './components/QuizItem'
import { QuizSummary } from './components/QuizSummary'

const Quiz = ({ className, item }) => {
  const [quizData, setQuizData] = useState(null)
  // const [answers, setAnswers] = useState({})
  useEffect(() => {
    ;(async () => {
      const response = await getQuizData(item.id)
      setQuizData(quizDataProcesser(response))
      // setQuizData(quizDataProcesser())
    })()
  }, [])

  if (!quizData) {
    return null
  }

  return (
    <div className={`${className}__quiz`}>
      <ul className={`${className}__quiz-items`}>
        {quizData.questions.map((question, index) => (
          <QuizItem
            key={question.id}
            className={`${className}__quiz-item`}
            item={question}
            order={`${index + 1} / ${quizData.questions.length}`}
          />
        ))}
      </ul>
      <QuizSummary className={`${className}__quiz-summary`} title={quizData.title} />
    </div>
  )
}

export default Quiz
