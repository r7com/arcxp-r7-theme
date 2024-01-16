/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import './index.scss'
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils'

const TemplateSearch = () => {
  const [pollId, setPollId] = useState('')

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    })
  }, [])

  const handleFieldChange = value => {
    setPollId(value)
  }

  const save = async () => {
    const ansStarter = ComposerHandler.getStarterPowerUpANS()

    const ansCustomEmbed = {
      ...ansStarter,
      config: {
        pollId,
      },
    }
    ComposerHandler.sendMessage('data', ansCustomEmbed)
  }

  const cancel = () => {
    ComposerHandler.sendMessage('cancel')
  }

  return (
    <div className="custom-embed-container">
      <h2 className="custom-embed-container__title">Embed poll by ID</h2>
      <input
        type="text"
        className="custom-embed-container__input"
        placeholder="Poll id..."
        value={pollId}
        onChange={e => handleFieldChange(e.target.value)}
      ></input>
      <div className="custom-embed-container__btns">
        <button className="custom-embed-container__btns__cancel" onClick={cancel}>
          Cancel
        </button>
        <button className="custom-embed-container__btns__save" onClick={save} disabled={!pollId}>
          Save
        </button>
      </div>
    </div>
  )
}

TemplateSearch.lazy = true
export default TemplateSearch
