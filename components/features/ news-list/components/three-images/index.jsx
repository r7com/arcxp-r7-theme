import React from 'react'
import { News } from './news'
import './index.scss'

export const ThreeImages = ({ content }) => {
  const maxNews = 3
  const data = content?.slice(0, maxNews)
  return (
    <div className="three-images">
      {data.map(item => (
        <News key={item._id} content={item} />
      ))}
    </div>
  )
}
