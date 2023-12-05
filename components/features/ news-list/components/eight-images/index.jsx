import React from 'react'
import { News } from './news'
import './index.scss'

export const EightImages = ({ content }) => {
  const maxNews = 8
  const data = content?.slice(0, maxNews)
  return (
    <div className="eight-images">
      {data && data.map(item => <News key={item._id} content={item} />)}
    </div>
  )
}
