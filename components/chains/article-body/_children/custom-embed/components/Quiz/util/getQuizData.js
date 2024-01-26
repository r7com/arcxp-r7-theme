import { GET_QUIZ_DATA_API } from 'fusion:environment'

export const getQuizData = quizId => {
  return fetch(`${GET_QUIZ_DATA_API}${quizId}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(err => {
      console.error('Error while fetching quiz data', err)
      return null
    })
}
