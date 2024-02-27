import '@r7/ui-tv-guide/style.css'
import '@r7/ui-article-delivery/style.css'
import '@r7/ui-layout/style.css'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { repeatProptypeStructure } from '../../../util/repeat-proptypes-structure'
import { daysOfTheWeekPT, guides } from './utils/mock'
import {
  addLiveKey,
  getHighlightedPrograms,
  getFormatedDate,
  translateDayName,
  formatProgramDate,
} from './utils/helpers'

import { Container } from '@r7/ui-layout'
import { TvGuide, TvGuideHighlight, TvGuidePrograms, TvGuideSelect } from '@r7/ui-tv-guide'
import { ConditionalLink, Typography } from '@r7/ui-base-components'
import { SocialShare } from '@r7/ui-article-delivery'

function TvGuidePage({ customFields }) {
  const allGuidesSelected = guides.filter(guide =>
    Object.values(customFields).some(field => field === guide.name),
  )

  const [selectedGuide, setSelectedGuide] = useState(allGuidesSelected[0].id)

  const [selectedDay, setSelectedDay] = useState(
    new Date().toLocaleString('default', { weekday: 'long' }),
  )

  const [highlightedPrograms, setHighlightedPrograms] = useState(
    guides.reduce((result, item) => {
      result[item.id] = []
      return result
    }, {}),
  )

  const dates = getFormatedDate(selectedDay)

  const filteredEvents =
    allGuidesSelected.length > 0 &&
    useContent({
      source: 'tv-guide-api',
      query: {
        id: selectedGuide,
        startDate: dates.startDate,
        endDate: dates.endDate,
      },
      transform: data => {
        if (data) {
          const events = {}

          const filterLive = addLiveKey(data)
          events[selectedDay] = filterLive

          if (highlightedPrograms[selectedGuide].length === 0)
            setHighlightedPrograms(prev => ({
              ...prev,
              [selectedGuide]: getHighlightedPrograms(filterLive),
            }))

          return events
        }
      },
    })

  if (!filteredEvents) return null

  const [liveEvent, ...nextEvents] = highlightedPrograms[selectedGuide]

  return (
    <Container>
      <TvGuide>
        <TvGuideHighlight>
          <TvGuideHighlight.Live>
            <ConditionalLink href={liveEvent?.call || liveEvent?.url} target="_blank">
              <TvGuide.Figure>
                <img
                  src={`${
                    liveEvent?.image || liveEvent?.image_mobile
                  }?dimensions=800x450&crop_position=c`}
                  alt={liveEvent?.name}
                  title={liveEvent?.name}
                  loading="lazy"
                />
              </TvGuide.Figure>
            </ConditionalLink>
          </TvGuideHighlight.Live>
          <TvGuideHighlight.Next>
            {nextEvents.map((nextEvent, index) => (
              <ConditionalLink key={index} href={nextEvent?.call || nextEvent?.url} target="_blank">
                <TvGuide.Card>
                  <TvGuide.Figure>
                    <img
                      src={`${
                        nextEvent?.image || nextEvent?.image_mobile
                      }?dimensions=150x82&crop_position=c`}
                      alt={nextEvent?.name}
                      title={nextEvent?.name}
                      loading="lazy"
                    />
                  </TvGuide.Figure>
                  <Typography fontWeight="bold">{index === 0 ? 'A Seguir' : 'Depois'}</Typography>
                  <Typography>
                    {nextEvent?.show.closed_caption && <TvGuide.ClosedCaption />}

                    {nextEvent?.show.audio_description && <TvGuide.AudioDescription />}

                    {nextEvent?.show.rating && (
                      <TvGuide.Rating rating={nextEvent?.show.rating}>
                        {nextEvent?.show.rating}
                      </TvGuide.Rating>
                    )}

                    {nextEvent?.show.quality && <TvGuide.HighDefinition />}

                    {nextEvent?.name}
                  </Typography>
                  <TvGuide.Time datetime={nextEvent?.start}>
                    {formatProgramDate(nextEvent?.start)}
                  </TvGuide.Time>
                </TvGuide.Card>
              </ConditionalLink>
            ))}
          </TvGuideHighlight.Next>
        </TvGuideHighlight>

        <TvGuideSelect
          defaultValue={selectedGuide}
          onChange={event => {
            setSelectedGuide(event.target.value)
          }}
        >
          {allGuidesSelected.map(guide => (
            <TvGuideSelect.Option key={guide.id} value={guide.id}>
              {guide.name}
            </TvGuideSelect.Option>
          ))}
        </TvGuideSelect>

        <TvGuidePrograms>
          <TvGuidePrograms.WeekList onTabChange={activeDay => setSelectedDay(activeDay)}>
            <TvGuidePrograms.WeekDay id="segunda">Segunda</TvGuidePrograms.WeekDay>
            <TvGuidePrograms.WeekDay id="terca">Terça</TvGuidePrograms.WeekDay>
            <TvGuidePrograms.WeekDay id="quarta">Quarta</TvGuidePrograms.WeekDay>
            <TvGuidePrograms.WeekDay id="quinta">Quinta</TvGuidePrograms.WeekDay>
            <TvGuidePrograms.WeekDay id="sexta">Sexta</TvGuidePrograms.WeekDay>
            <TvGuidePrograms.WeekDay id="sabado">Sábado</TvGuidePrograms.WeekDay>
            <TvGuidePrograms.WeekDay id="domingo">Domingo</TvGuidePrograms.WeekDay>
          </TvGuidePrograms.WeekList>

          {daysOfTheWeekPT.map(day => (
            <TvGuidePrograms.EventsList id={day} key={day}>
              {filteredEvents[translateDayName(day)]?.length > 0
                ? filteredEvents[translateDayName(day)].map(event => (
                    <TvGuidePrograms.EventItem key={event?.id} isLive={event?.live}>
                      <TvGuide.Time datetime={event?.start} hiddenOnMobile>
                        {formatProgramDate(event?.start)}
                      </TvGuide.Time>
                      <TvGuide.Card>
                        <TvGuide.Figure>
                          <img
                            src={`${
                              event?.image || event?.image_mobile
                            }?dimensions=150x82&crop_position=c`}
                            alt={event?.name}
                            title={event?.name}
                            loading="lazy"
                          />
                        </TvGuide.Figure>
                        <Typography>
                          {event?.show.closed_caption && <TvGuide.ClosedCaption />}

                          {event?.show.audio_description && <TvGuide.AudioDescription />}

                          {event?.show.rating && (
                            <TvGuide.Rating rating={event?.show.rating}>
                              {event?.show.rating}
                            </TvGuide.Rating>
                          )}

                          {event?.show.quality && <TvGuide.HighDefinition />}

                          {event?.name}
                        </Typography>
                        <Typography>
                          <TvGuide.Time datetime={event?.start}>
                            {formatProgramDate(event?.start)} -
                          </TvGuide.Time>
                          <TvGuide.Time datetime={event?.finish}>
                            {formatProgramDate(event?.finish)}
                          </TvGuide.Time>
                        </Typography>
                      </TvGuide.Card>

                      {event?.call && (
                        <TvGuide.Button href={event.call} target="_blank" color="tertiary">
                          Assista à chamada
                        </TvGuide.Button>
                      )}

                      {event?.article && (
                        <TvGuide.Button href={event.article} target="_blank">
                          Íntegra
                        </TvGuide.Button>
                      )}

                      <TvGuidePrograms.EventDescription>
                        {event?.show.description && <Typography>{event?.description}</Typography>}
                        {event?.url && (
                          <ConditionalLink
                            href={event.url}
                            title={`Acesse o site do programa ${event?.name}`}
                            target="_blank"
                          >
                            Acesse o site do programa
                          </ConditionalLink>
                        )}

                        <SocialShare>
                          <SocialShare.List>
                            {event.show.social.twitter && (
                              <SocialShare.Item
                                name="twitter"
                                title={event.name}
                                link={event.show.social.twitter}
                              />
                            )}

                            {event.show.social.facebook && (
                              <SocialShare.Item
                                name="facebook"
                                title={event.name}
                                link={event.show.social.facebook}
                              />
                            )}

                            {event.show.social.whatsapp && (
                              <SocialShare.Item
                                name="whatsapp"
                                title={event.name}
                                link={event.show.social.whatsapp}
                              />
                            )}
                          </SocialShare.List>
                        </SocialShare>
                      </TvGuidePrograms.EventDescription>
                    </TvGuidePrograms.EventItem>
                  ))
                : 'carregando...'}
            </TvGuidePrograms.EventsList>
          ))}
        </TvGuidePrograms>
      </TvGuide>
    </Container>
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
