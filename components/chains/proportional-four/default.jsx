import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'

import { Proportional } from '@r7/ui-layout'

function ProportionalFourChain({ children }) {
  if (children && children.length === 0) return null

  const [block1, block2, block3, block4] = React.Children.toArray(children)

  return (
    <Proportional.Four>
      {block1 && block1}
      {block2 && block2}
      {block3 && block3}
      {block4 && block4}
    </Proportional.Four>
  )
}

ProportionalFourChain.propTypes = {
  children: PropTypes.array,
}

ProportionalFourChain.label = 'Grid Proporcional 4 - R7'

ProportionalFourChain.icon = 'arc-article'

export default ProportionalFourChain
