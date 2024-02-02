import './index.scss'
import React, { useState, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { getQuizData } from './util/getQuizData'
import { quizDataProcesser } from './util/quizDataProcesser'
import { getResult } from './util/getResult'
import { QuizItem } from './components/QuizItem'
import { QuizSummary } from './components/QuizSummary'
import { QuizContext } from './context'
import { QuizCounter } from './components/QuizCounter'

export const Quiz = ({ className, item }) => {
  const { arcSite, globalContent } = useFusionContext()
  const { primaryColor, websiteDomain } = getProperties(arcSite)
  const [quizData, setQuizData] = useState(null)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [disabled, setDisabled] = useState(false)
  const counter = quizData?.questions.length - Object.keys(selectedAnswers).length

  const resetQuiz = () => {
    setDisabled(false)
    setSelectedAnswers({})
  }

  useEffect(() => {
    ;(async () => {
      const response = await getQuizData(item.config?.quizId)
      setQuizData(quizDataProcesser(response))
    })()
  }, [])

  useEffect(() => {
    if (counter === 0) {
      setDisabled(true)
    }
  }, [selectedAnswers])

  if (!quizData) {
    return null
  }

  if (!quizData?.published || !quizData?.questions.length) {
    return null
  }

  return (
    <div className={`${className}__quiz`}>
      <QuizContext.Provider value={{ disabled, selectedAnswers, setSelectedAnswers, primaryColor }}>
        <ul className={`${className}__quiz-items`}>
          {quizData.questions.map((question, index) => (
            <QuizItem
              key={question._id}
              className={`${className}__quiz-item`}
              item={question}
              order={`${index + 1} / ${quizData.questions.length}`}
              showAnswer={quizData.showAnswer}
            />
          ))}
        </ul>
        {counter !== 0 ? (
          <QuizCounter
            className={`${className}__quiz-counter`}
            primaryColor={primaryColor}
            counter={counter}
          />
        ) : (
          <QuizSummary
            className={`${className}__quiz-summary`}
            primaryColor={primaryColor}
            result={getResult(selectedAnswers, quizData.result_ranges)}
            reset={resetQuiz}
            urlForShare={encodeURI(`${websiteDomain}${globalContent.website_url}`)}
          />
        )}
      </QuizContext.Provider>
    </div>
  )
}
