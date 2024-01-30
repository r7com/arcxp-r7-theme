import React from 'react'

export const QuizCounter = ({ className, primaryColor, counter }) => {
  return (
    <div className={className} style={{ borderLeft: `12px solid ${primaryColor}` }}>
      Ainda restam {counter} perguntas a serem respondidas, não desista você consegue!
    </div>
  )
}
