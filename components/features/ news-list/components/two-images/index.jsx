import React from 'react'
import { News } from './news'
import './index.scss'

export const TwoImages = ({ content }) => {
  return (
    <>
      <div className="two-images">
        <News content={content[0]} />
        <News content={content[1]} />
      </div>
    </>
  )
}
