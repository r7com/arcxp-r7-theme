export const getDateFromUrl = url => {
  const dateFromUrlRx = /(\d{8})$/
  const match = url.match(dateFromUrlRx)

  if (match) {
    return match[1]
  }

  return ''
}

export const formatDate = dateString => {
  const day = dateString.substring(0, 2)
  const month = dateString.substring(2, 4)
  const year = dateString.substring(4)

  return new Date(`${year}/${month}/${day}`)
}
