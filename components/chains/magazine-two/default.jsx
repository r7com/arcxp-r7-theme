import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'

import { Magazine } from '@r7/ui-layout'
import { taboolaDataAttr } from '../../../util/helpers'

function MagazineTwoChain({ children, customFields }) {
  if (children && children.length === 0) return null
  const { chainName } = customFields

  const [block1, block2] = React.Children.toArray(children)

  return (
    <div {...taboolaDataAttr(chainName)}>
      <Magazine.Two>
        {block1 && block1}
        {block2 && block2}
      </Magazine.Two>
    </div>
  )
}

MagazineTwoChain.propTypes = {
  children: PropTypes.array,
}

MagazineTwoChain.propTypes = {
  customFields: PropTypes.shape({
    chainName: PropTypes.string.tag({
      label: 'Nome do bloco',
    }),
  }),
}

MagazineTwoChain.label = 'Grid Revista 2 - R7'

MagazineTwoChain.icon = 'arc-article'

export default MagazineTwoChain
