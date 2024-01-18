import { POST_POLL_ANSWER_API } from 'fusion:environment'

export const submitForm = async (formId, selectedOptionId, recapatchaToken) => {
  const formData = new FormData()
  formData.append('poll_id', formId)
  formData.append('answer_id', selectedOptionId)
  formData.append('g-recaptcha-response', recapatchaToken)

  try {
    const res = await fetch(POST_POLL_ANSWER_API, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (data) {
      return true
    } else {
      throw new Error('Invalid data')
    }
  } catch (error) {
    console.error('Form submission - Error:', error)
    return null
  }
}
