import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'

import { Magazine } from '@r7/ui-layout'
import { taboolaDataAttr } from '../../../util/helpers'

function MagazineOneChain({ children, customFields }) {
  if (children && children.length === 0) return null
  const { chainName } = customFields
  const [block1, block2, block3] = React.Children.toArray(children)

  return (
    <div {...taboolaDataAttr(chainName)}>
      <Magazine.One>
        {block1 && block1}
        {block2 && block2}
        {block3 && block3}
      </Magazine.One>
    </div>
  )
}

MagazineOneChain.propTypes = {
  children: PropTypes.array,
}

MagazineOneChain.propTypes = {
  customFields: PropTypes.shape({
    chainName: PropTypes.string.tag({
      label: 'Nome do bloco',
    }),
  }),
}

MagazineOneChain.label = 'Grid Revista 1 - R7'

MagazineOneChain.icon = 'arc-article'

export default MagazineOneChain
