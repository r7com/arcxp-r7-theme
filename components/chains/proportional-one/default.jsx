import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'

import { Proportional } from '@r7/ui-layout'

function ProportionalOneChain({ children }) {
  if (children && children.length === 0) return null

  const [block] = React.Children.toArray(children)

  return <Proportional.One>{block && block}</Proportional.One>
}

ProportionalOneChain.propTypes = {
  children: PropTypes.array,
}

ProportionalOneChain.label = 'Grid Proporcional 1 - R7'

ProportionalOneChain.icon = 'arc-article'

export default ProportionalOneChain
