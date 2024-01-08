import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'

import { Proportional } from '@r7/ui-layout'

function ProportionalThreeChain({ children }) {
  if (children && children.length === 0) return null

  const [block1, block2, block3] = React.Children.toArray(children)

  return (
    <Proportional.Three>
      {block1 && block1}
      {block2 && block2}
      {block3 && block3}
    </Proportional.Three>
  )
}

ProportionalThreeChain.propTypes = {
  children: PropTypes.array,
}

ProportionalThreeChain.label = 'Grid Proporcional 3 - R7'

ProportionalThreeChain.icon = 'arc-article'

export default ProportionalThreeChain
