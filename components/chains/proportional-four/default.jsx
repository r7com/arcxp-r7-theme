import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'
import { taboolaDataAttr } from '../../../util/helpers'
import { Proportional } from '@r7/ui-layout'

function ProportionalFourChain({ children, customFields }) {
  if (children && children.length === 0) return null
  const { chainName } = customFields

  const [block1, block2, block3, block4] = React.Children.toArray(children)

  return (
    <div {...taboolaDataAttr(chainName)}>
      <Proportional.Four>
        {block1 && block1}
        {block2 && block2}
        {block3 && block3}
        {block4 && block4}
      </Proportional.Four>
    </div>
  )
}

ProportionalFourChain.propTypes = {
  children: PropTypes.array,
}

ProportionalFourChain.propTypes = {
  customFields: PropTypes.shape({
    chainName: PropTypes.string.tag({
      label: 'Nome do bloco',
    }),
  }),
}

ProportionalFourChain.label = 'Grid Proporcional 4 - R7'

ProportionalFourChain.icon = 'arc-article'

export default ProportionalFourChain
