import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'

import { Proportional } from '@r7/ui-layout'

function ProportionalTwoChain({ children }) {
  if (children && children.length === 0) return null

  const [block1, block2] = React.Children.toArray(children)

  return (
    <Proportional.Two>
      {block1 && block1}
      {block2 && block2}
    </Proportional.Two>
  )
}

ProportionalTwoChain.propTypes = {
  children: PropTypes.array,
}

ProportionalTwoChain.label = 'Grid Proporcional 2 - R7'

ProportionalTwoChain.icon = 'arc-article'

export default ProportionalTwoChain
