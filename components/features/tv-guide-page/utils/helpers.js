import { daysOfTheWeekUS } from './mock'

export function translateDayName(dayPT) {
  const days = {
    segunda: 'Monday',
    terca: 'Tuesday',
    quarta: 'Wednesday',
    quinta: 'Thursday',
    sexta: 'Friday',
    sabado: 'Saturday',
    domingo: 'Sunday',
  }

  return days[dayPT]
}

export function formatProgramDate(date) {
  const d = new Date(date).toLocaleString('default', { timeStyle: 'short', hour12: false })
  const formattedDate = d.replace(/[ap]m/i, '').replace(':', 'h')

  return formattedDate.trim()
}

export function getFormatedDate(day) {
  const dayOfWeek = daysOfTheWeekUS.findIndex(name => name === day)

  let today = new Date()

  const date = new Date(today.setDate(today.getDate() - today.getDay() + dayOfWeek))

  const start = new Date(date)

  const end = new Date(date)
  end.setDate(date.getDate() + 1)

  const formatedStartMonth =
    start.getMonth() + 1 < 10 ? `0${start.getMonth() + 1}` : start.getMonth() + 1

  const formatedEndMonth = end.getMonth() + 1 < 10 ? `0${end.getMonth() + 1}` : end.getMonth() + 1

  const startDate = `${start.getFullYear()}-${formatedStartMonth}-${start.getDate()}T05:00:00-03:00`
  const endDate = `${end.getFullYear()}-${formatedEndMonth}-${end.getDate()}T04:00:00-03:00`

  return {
    startDate,
    endDate,
  }
}

export function addLiveKey(events) {
  const now = new Date()

  const eventsWithLiveKey = events.map(event => {
    event.live = now >= new Date(event.start) && now <= new Date(event.finish)

    return event
  })

  return eventsWithLiveKey
}

export function getHighlightedPrograms(events) {
  const liveEventIndex = events.findIndex(event => event.live)

  return events.slice(liveEventIndex - 1, liveEventIndex + 2)
}
