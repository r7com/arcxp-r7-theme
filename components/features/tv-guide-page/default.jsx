import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { repeatProptypeStructure } from '../../../util/repeat-proptypes-structure'
import { daysOfTheWeek, guides } from './utils/mock'
import { addLiveKey, getCurrentDayEvents, getEndDate, getStartDate } from './utils/helpers'

function TvGuidePage({ customFields }) {
  const allGuidesSelected = guides.filter(guide =>
    Object.values(customFields).some(field => field === guide.name),
  )
  const events =
    allGuidesSelected.length > 0 &&
    useContent({
      source: 'tv-guide-api',
      query: {
        id: allGuidesSelected[0].id,
        startDate: getStartDate(),
        endDate: getEndDate(),
      },
    })

  if (!events) return null

  const eventsWithLive = addLiveKey(events)

  const getLiveProgram = eventsWithLive.find(event => {
    if (event.live) return event
  })

  const currentEvents = getCurrentDayEvents(eventsWithLive)

  return (
    <>
      <h1>Escolha Grade de programação:</h1>
      {allGuidesSelected.length > 0 && (
        <select name="tv_guide" id="tv_guide">
          {allGuidesSelected.map(guide => (
            <option key={guide.id}>{guide.name}</option>
          ))}
        </select>
      )}
      <div style={{ minHeight: 200, backgroundColor: '#f8f8f8' }}>
        <h2>
          Programa {getLiveProgram?.name} está {getLiveProgram?.live}
        </h2>
      </div>
      <ul>
        {daysOfTheWeek.map(day => (
          <li key={day}>{day}</li>
        ))}
      </ul>
      <div>Eventos do dia atual</div>
      <ul>
        {currentEvents.map(event => (
          <li key={event.id}>
            <h3>
              {event.name} {event.live && event.live}
            </h3>
          </li>
        ))}
      </ul>
    </>
  )
}

TvGuidePage.propTypes = {
  customFields: PropTypes.shape({
    ...repeatProptypeStructure({
      count: guides.length,
      shapeTemplate(counter) {
        return {
          [`guide-${counter}`]: PropTypes.oneOf(guides.map(item => item.name)).tag({
            group: `Grade ${counter}`,
            label: `Escolha a grade na posição ${counter}`,
          }),
        }
      },
    }),
  }),
}

TvGuidePage.label = 'Grade de Programação (Página) - R7'

export default TvGuidePage
