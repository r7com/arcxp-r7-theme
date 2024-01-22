import { GET_POLL_DATA_API } from 'fusion:environment'

export const getPollData = pollId => {
  return fetch(`${GET_POLL_DATA_API}${pollId}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(err => {
      console.error('Error while fetching poll data', err)
      return null
    })
}
