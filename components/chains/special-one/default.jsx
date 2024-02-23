import '@r7/ui-layout/style.css'
import React from 'react'
import PropTypes from 'prop-types'
import { SpecialOne } from '@r7/ui-layout'
import { taboolaDataAttr } from '../../../util/helpers'

const SpecialOneChain = ({ children, customFields }) => {
  if (children && children.length === 0) return null
  const { chainName } = customFields
  const [block1, block2, block3, block4, block5, block6] = React.Children.toArray(children)

  return (
    <div {...taboolaDataAttr(chainName)}>
      <SpecialOne
        renderMain={
          <SpecialOne.Main
            rowOne={
              <>
                {block1 && block1}
                {block2 && block2}
              </>
            }
            rowTwo={
              <>
                {block3 && block3}
                {block4 && block4}
                {block5 && block5}
              </>
            }
          />
        }
        renderSidebar={<SpecialOne.Sidebar>{block6 && block6}</SpecialOne.Sidebar>}
      />
    </div>
  )
}

SpecialOneChain.propTypes = {
  children: PropTypes.array,
}

SpecialOneChain.propTypes = {
  customFields: PropTypes.shape({
    chainName: PropTypes.string.tag({
      label: 'Nome do bloco',
    }),
  }),
}

SpecialOneChain.label = 'Grid Especial 1 - R7'

export default SpecialOneChain
