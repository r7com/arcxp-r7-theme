import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'
import { taboolaDataAttr } from '../../../util/helpers'
import { Proportional } from '@r7/ui-layout'

function ProportionalOneChain({ children, customFields }) {
  if (children && children.length === 0) return null
  const { chainName } = customFields
  const [block] = React.Children.toArray(children)

  return (
    <div {...taboolaDataAttr(chainName)}>
      <Proportional.One>{block && block}</Proportional.One>
    </div>
  )
}

ProportionalOneChain.propTypes = {
  children: PropTypes.array,
}

ProportionalOneChain.propTypes = {
  customFields: PropTypes.shape({
    chainName: PropTypes.string.tag({
      label: 'Nome do bloco',
    }),
  }),
}

ProportionalOneChain.label = 'Grid Proporcional 1 - R7'

ProportionalOneChain.icon = 'arc-article'

export default ProportionalOneChain
