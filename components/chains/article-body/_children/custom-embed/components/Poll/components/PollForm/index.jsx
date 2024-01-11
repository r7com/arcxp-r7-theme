import React, { useState } from 'react'
import { Option } from './Option'

export const PollForm = ({ className, options, setShowResults, handleSubmit, vote }) => {
  const [selectedOptionId, setSelectedOptionId] = useState(vote)

  const handleOptionChange = e => {
    setSelectedOptionId(e.target.value)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    handleSubmit(selectedOptionId)
  }

  return (
    <form onSubmit={handleFormSubmit} className={`${className}-content-form`}>
      <ul className={`${className}-content-form-options`}>
        {options.map(option => (
          <Option
            key={`form-${option._id}`}
            option={option}
            className={`${className}-content-form-option`}
            selectedOptionId={selectedOptionId}
            handleRadioSubmit={handleOptionChange}
          />
        ))}
      </ul>

      <div className={`${className}-content-form-btns`}>
        <button
          onClick={() => {
            setShowResults(true)
          }}
        >
          Resultado Parcial
        </button>
        <button type="submit" disabled={!selectedOptionId || selectedOptionId === vote}>
          Voltar
        </button>
      </div>
    </form>
  )
}
