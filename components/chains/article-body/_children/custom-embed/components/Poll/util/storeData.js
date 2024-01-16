/* eslint-disable no-undef*/
export const storeData = (formId, selectedOptionId) => {
  const storagedVotes = JSON.parse(localStorage.getItem('selectedOption'))
  if (storagedVotes) {
    localStorage.setItem(
      'selectedOption',
      JSON.stringify({ ...storagedVotes, [formId]: selectedOptionId }),
    )
  } else {
    localStorage.setItem('selectedOption', JSON.stringify({ [formId]: selectedOptionId }))
  }
}
