import React from 'react'
import '@r7/ui-layout/style.css'
import { LatestNews } from '@r7/ui-layout'
import PropTypes from 'prop-types'
import { taboolaDataAttr } from '../../../util/helpers'

const LatestNewsChain = ({ children, customFields }) => {
  if (children && children.length === 0) return null
  const { chainName } = customFields

  const [block1, block2, block3, block4] = React.Children.toArray(children)

  return (
    <div {...taboolaDataAttr(chainName)}>
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
    </div>
  )
}

LatestNewsChain.label = 'Ultimas Notícias - R7'

LatestNewsChain.propTypes = {
  customFields: PropTypes.shape({
    chainName: PropTypes.string.tag({
      label: 'Nome do bloco',
    }),
  }),
}

export default LatestNewsChain
