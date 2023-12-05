import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'
import { SpecialOne } from '@r7/ui-layout'

const SpecialOneChain = ({ children }) => {
  if (children && children.length === 0) return null

  const [block1, block2, block3, block4, block5, block6] = React.Children.toArray(children)

  return (
    <SpecialOne
      renderMain={
        <SpecialOne.Main
          lineOne={
            <>
              {block1 && block1}
              {block2 && block2}
            </>
          }
          lineTwo={
            <>
              {block3 && block3}
              {block4 && block4}
              {block5 && block5}
            </>
          }
        />
      }
      renderSidebar={<SpecialOne.Sidebar>{block6 && block6}</SpecialOne.Sidebar>}
    />
  )
}

SpecialOneChain.propTypes = {
  children: PropTypes.array,
}

SpecialOneChain.label = 'Grid Especial 1 - R7'

export default SpecialOneChain
