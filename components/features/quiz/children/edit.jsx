/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import './index.scss'
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils'

const TemplateEdit = () => {
  const [quizId, setQuizId] = useState('')
  const [payload, setPayload] = useState({})

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    })

    const data = ComposerHandler.getPayload()
    setQuizId(data?.config?.quizId)
    setPayload(data)
  }, [])

  const handleFieldChange = value => {
    setQuizId(value)
  }

  const save = async () => {
    const ansCustomEmbed = {
      ...payload,
      config: {
        quizId,
      },
    }
    ComposerHandler.sendMessage('data', ansCustomEmbed)
  }

  const cancel = () => {
    ComposerHandler.sendMessage('cancel')
  }

  return (
    <div className="custom-embed-container">
      <h2 className="custom-embed-container__title">Embed quiz by ID</h2>
      <input
        type="text"
        className="custom-embed-container__input"
        placeholder="Quiz id..."
        value={quizId}
        onChange={e => handleFieldChange(e.target.value)}
      ></input>
      <div className="custom-embed-container__btns">
        <button className="custom-embed-container__btns__cancel" onClick={cancel}>
          Cancel
        </button>
        <button className="custom-embed-container__btns__save" onClick={save} disabled={!quizId}>
          Save
        </button>
      </div>
    </div>
  )
}

TemplateEdit.lazy = true
export default TemplateEdit
