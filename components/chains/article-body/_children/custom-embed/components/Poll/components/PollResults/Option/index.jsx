import React from 'react'

export const Option = ({ className, optionText, optionVotesPercentage }) => {
  return (
    <li className={className}>
      <div className={`${className}-top`}>
        <p>{optionText}</p>
        <span>{`${optionVotesPercentage}%`}</span>
      </div>
      <div className={`${className}-bar`}>
        <span style={{ width: `${optionVotesPercentage}%` }}></span>
      </div>
    </li>
  )
}
