import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'
import { taboolaDataAttr } from '../../../util/helpers'
import { Proportional } from '@r7/ui-layout'

function ProportionalTwoChain({ children, customFields }) {
  if (children && children.length === 0) return null
  const { chainName } = customFields
  const [block1, block2] = React.Children.toArray(children)

  return (
    <div {...taboolaDataAttr(chainName)}>
      <Proportional.Two>
        {block1 && block1}
        {block2 && block2}
      </Proportional.Two>
    </div>
  )
}

ProportionalTwoChain.propTypes = {
  children: PropTypes.array,
}

ProportionalTwoChain.propTypes = {
  customFields: PropTypes.shape({
    chainName: PropTypes.string.tag({
      label: 'Nome do bloco',
    }),
  }),
}

ProportionalTwoChain.label = 'Grid Proporcional 2 - R7'

ProportionalTwoChain.icon = 'arc-article'

export default ProportionalTwoChain
