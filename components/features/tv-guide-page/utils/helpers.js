export const getStartDate = () => {
  let date = new Date()
  date.setDate(date.getDate() - 1)

  return date
}

export const getEndDate = () => {
  let date = new Date()
  date.setDate(date.getDate() + 1)

  return date
}

/**
 * @method getCurrentDayEvents
 * @description Grade de programação da record inicia 5 da manhã de hoje e considera
 * até 4 da manhã do dia seguinte
 */
export const getCurrentDayEvents = events => {
  const now = new Date()

  const startRange = new Date(now)
  startRange.setHours(5, 0, 0, 0)

  const endRange = new Date(now)
  endRange.setDate(now.getDate() + 1)
  endRange.setHours(4, 0, 0, 0)

  const filteredEvents = events.filter(event => {
    const eventStart = new Date(event.start)
    return eventStart >= startRange && eventStart <= endRange
  })

  return filteredEvents
}

export function addLiveKey(events) {
  const now = new Date()

  const eventsWithLiveKey = events.map(event => {
    if (now >= new Date(event.start) && now <= new Date(event.finish)) {
      event.live = 'No ar'
    }

    return event
  })

  return eventsWithLiveKey
}
