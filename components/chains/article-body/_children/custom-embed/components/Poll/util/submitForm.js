import { POST_POLL_ANSWER_API } from 'fusion:environment'

export const submitForm = (formId, selectedOptionId, recapatchaToken) => {
  const formData = new FormData()
  formData.append('poll_id', formId)
  formData.append('answer_id', selectedOptionId)
  formData.append('g-recaptcha-response', recapatchaToken)

  fetch(POST_POLL_ANSWER_API, {
    method: 'POST',
    body: formData,
  })
    .then(res => {
      console.log(res)
    })
    .then(data => {
      console.log('Form submission - Success:', data)
    })
    .catch(error => {
      console.error('Form submission - Error:', error)
      console.log(error)
    })
}
