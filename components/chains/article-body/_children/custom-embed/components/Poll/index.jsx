/* eslint-disable no-undef*/
import './index.scss'
import React, { useState, useEffect, useCallback } from 'react'
import { submitForm } from './util/submitForm'
import { storeData } from './util/storeData'
import { executeCaptcha } from './util/executeCaptcha'
import { getPollData } from './util/getPollData'
import { PollResults } from './components/PollResults'
import { PollForm } from './components/PollForm'
import { PollMedia } from './components/PollMedia'
import { Captcha } from './components/Captcha'

export const Poll = ({ className, item }) => {
  const [showResults, setShowResults] = useState(false)
  const [pollData, setPollData] = useState(null)
  const [vote, setVote] = useState(null)

  const handleSubmit = useCallback(
    optionId => {
      executeCaptcha(token => {
        console.log(token)
        submitForm(pollData._id, optionId, token)
      })
      setShowResults(true)
      setVote(optionId)
      storeData(pollData._id, optionId)
    },
    [pollData],
  )

  useEffect(() => {
    ;(async () => {
      const storagedVote = JSON.parse(localStorage.getItem('selectedOption'))
      const data = await getPollData(item.config?.pollId)
      setPollData(data)
      setVote(storagedVote?.[data?._id])
    })()
  }, [])

  if (!pollData) {
    return null
  }

  return (
    <div className={`${className}__poll`}>
      <div className={`${className}__poll-container`}>
        <h3 className={`${className}__poll-title`}>{pollData.question}</h3>
        {showResults ? (
          <PollResults
            className={`${className}__poll`}
            setShowResults={setShowResults}
            voted={vote}
            options={pollData.answers}
          />
        ) : (
          <>
            {pollData.main_media ? (
              <PollMedia className={`${className}__poll`} item={pollData} />
            ) : null}
            <PollForm
              className={`${className}__poll`}
              options={pollData.answers}
              handleSubmit={handleSubmit}
              setShowResults={setShowResults}
              vote={vote}
            />
          </>
        )}
        <Captcha className={`${className}__poll`} />
      </div>
    </div>
  )
}
