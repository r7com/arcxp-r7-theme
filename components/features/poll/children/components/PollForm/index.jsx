import React from 'react'
import { Option } from './Option'

export const PollForm = ({ className, options }) => {
  return (
    <form className={`${className}-content-form`}>
      <ul className={`${className}-content-form-options`}>
        {options.map(option => (
          <Option
            key={`form-${option._id}`}
            option={option}
            className={`${className}-content-form-option`}
          />
        ))}
      </ul>
    </form>
  )
}
