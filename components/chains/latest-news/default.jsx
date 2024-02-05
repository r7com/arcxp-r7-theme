import React from 'react'
import '@r7/ui-layout/style.css'
import { LatestNews } from '@r7/ui-layout'

const LatestNewsChain = ({ children }) => {
  if (children && children.length === 0) return null

  const [block1, block2, block3, block4] = React.Children.toArray(children)

  return (
    <LatestNews
      renderMain={block1 && block1}
      renderSidebar={
        <LatestNews.Sidebar
          rowOne={block2 && block2}
          rowTwo={block3 && block3}
          rowThree={block4 && block4}
        />
      }
    />
  )
}

LatestNewsChain.label = 'Ultimas Notícias - R7'

export default LatestNewsChain
