/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import './index.scss'
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils'
import { GET_QUIZ_DATA_API } from 'fusion:environment'
import { QuizItem } from './components/QuizItem'

const TemplateView = () => {
  const [quizData, setQuizData] = useState(null)

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    })

    const data = ComposerHandler.getPayload()
    ;(async () => {
      setQuizData(await getQuizData(data?.config?.quizId))
    })()
  }, [])

  const getQuizData = quizId => {
    return fetch(`${GET_QUIZ_DATA_API}${quizId}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .catch(err => {
        console.log('Error while fetching quiz data', err)
        return null
      })
  }

  if (!quizData) {
    return null
  }

  return (
    <div className="custom-embed-container__quiz">
      <ul className="custom-embed-container__quiz-items">
        {quizData.questions.map((question, index) => (
          <QuizItem
            key={question._id}
            className="custom-embed-container__quiz-item"
            item={question}
            order={`${index + 1} / ${quizData.questions.length}`}
          />
        ))}
      </ul>
    </div>
  )
}

TemplateView.lazy = true
export default TemplateView
