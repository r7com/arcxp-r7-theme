/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import './index.scss'
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils'
import { GET_POLL_DATA_API } from 'fusion:environment'
import { PollMedia } from './components/PollMedia'
import { PollForm } from './components/PollForm'

const TemplateView = () => {
  const [pollData, setPollData] = useState(null)

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    })

    const data = ComposerHandler.getPayload()
    ;(async () => {
      setPollData(await getPollData(data?.config?.pollId))
    })()
  }, [])

  const getPollData = pollId => {
    return fetch(`${GET_POLL_DATA_API}${pollId}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .catch(err => {
        console.log('Error while fetching poll data', err)
        return null
      })
  }

  if (!pollData) {
    return null
  }

  return (
    <div className="custom-embed-container__form">
      <div className="custom-embed-container__form-container">
        <h3 className="custom-embed-container__form-title">{pollData.question}</h3>
        {pollData.main_media ? (
          <PollMedia className="custom-embed-container__form" item={pollData} />
        ) : null}
        <PollForm className="custom-embed-container__form" options={pollData.answers} />
      </div>
    </div>
  )
}

TemplateView.lazy = true
export default TemplateView
