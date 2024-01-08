import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'

import { Magazine } from '@r7/ui-layout'

function MagazineOneChain({ children }) {
  if (children && children.length === 0) return null

  const [block1, block2, block3] = React.Children.toArray(children)

  return (
    <Magazine.One>
      {block1 && block1}
      {block2 && block2}
      {block3 && block3}
    </Magazine.One>
  )
}

MagazineOneChain.propTypes = {
  children: PropTypes.array,
}

MagazineOneChain.label = 'Grid Revista 1 - R7'

MagazineOneChain.icon = 'arc-article'

export default MagazineOneChain
