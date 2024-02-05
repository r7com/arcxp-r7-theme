function convertMillisecondsToISO8601Duration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let iso8601Duration = 'PT'

  if (hours > 0) {
    iso8601Duration += `${hours}H`
  }

  if (minutes > 0) {
    iso8601Duration += `${minutes}M`
  }

  if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
    iso8601Duration += `${remainingSeconds}S`
  }

  return iso8601Duration
}

export default convertMillisecondsToISO8601Duration
