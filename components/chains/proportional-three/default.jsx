import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'
import { Proportional } from '@r7/ui-layout'
import { taboolaDataAttr } from '../../../util/helpers'

function ProportionalThreeChain({ children, customFields }) {
  if (children && children.length === 0) return null
  const { chainName } = customFields
  const [block1, block2, block3] = React.Children.toArray(children)

  return (
    <div {...taboolaDataAttr(chainName)}>
      <Proportional.Three>
        {block1 && block1}
        {block2 && block2}
        {block3 && block3}
      </Proportional.Three>
    </div>
  )
}

ProportionalThreeChain.propTypes = {
  children: PropTypes.array,
}

ProportionalThreeChain.propTypes = {
  customFields: PropTypes.shape({
    chainName: PropTypes.string.tag({
      label: 'Nome do bloco',
    }),
  }),
}

ProportionalThreeChain.label = 'Grid Proporcional 3 - R7'

ProportionalThreeChain.icon = 'arc-article'

export default ProportionalThreeChain
