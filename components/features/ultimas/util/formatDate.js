export const formatDate = dateString => {
  const date = new Date(dateString)
  const now = new Date()

  const timeDifference = now - date
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  const utcNow = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const dayDifference = Math.floor((utcNow - utcDate) / (1000 * 60 * 60 * 24))

  if (dayDifference >= 1) {
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
  } else if (hours >= 1) {
    return `HÁ ${hours} HORA${hours > 1 ? 'S' : ''}`
  } else {
    return `HÁ ${minutes} MINUTO${minutes > 1 ? 'S' : ''}`
  }
}
