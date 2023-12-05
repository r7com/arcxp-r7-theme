import React from 'react'
import { News } from './news'
import './index.scss'

export const FourImages = ({ content }) => {
  const maxNews = 4
  const data = content?.slice(0, maxNews)
  return (
    <div className="four-images">
      {data && data.map(item => <News key={item._id} content={item} />)}
    </div>
  )
}
