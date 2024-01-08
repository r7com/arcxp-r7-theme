import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'

import { Magazine } from '@r7/ui-layout'

function MagazineTwoChain({ children }) {
  if (children && children.length === 0) return null

  const [block1, block2] = React.Children.toArray(children)

  return (
    <Magazine.Two>
      {block1 && block1}
      {block2 && block2}
    </Magazine.Two>
  )
}

MagazineTwoChain.propTypes = {
  children: PropTypes.array,
}

MagazineTwoChain.label = 'Grid Revista 2 - R7'

MagazineTwoChain.icon = 'arc-article'

export default MagazineTwoChain
