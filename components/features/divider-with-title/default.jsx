import './default.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

const BLOCK_CLASS_NAME = 'ultimas-divider'

const marginBottonMap = {
  sm: '8px',
  md: '16px',
  lg: '28px',
}

function DividerWithTitle({ customFields: { title, bottomIndent } }) {
  const { arcSite } = useFusionContext()
  const { primaryColor } = getProperties(arcSite)

  return (
    <div
      style={{ marginBottom: marginBottonMap[bottomIndent] }}
      className={`${BLOCK_CLASS_NAME}__header-container`}
    >
      <p className={`${BLOCK_CLASS_NAME}__header-text`} style={{ color: primaryColor }}>
        {title}
      </p>
      <span
        className={`${BLOCK_CLASS_NAME}__header-divider`}
        style={{ backgroundColor: primaryColor }}
      ></span>
    </div>
  )
}

DividerWithTitle.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.isRequired.tag({
      label: 'Divider Title',
    }),
    bottomIndent: PropTypes.oneOf(['sm', 'md', 'lg']).tag({
      labels: marginBottonMap,
      defaultValue: 'sm',
    }),
    // fontSize: PropTypes.oneOf([
    //   'little',
    //   'xxxs',
    //   'xxs',
    //   'xs',
    //   'sm',
    //   'md',
    //   'lg',
    //   'xl',
    //   'xxl',
    //   'xxxl',
    // ]).isRequired.tag({
    //   label: 'Divider Font Size',
    //   defaultValue: 'lg',
    // }),
    // fontWeight: PropTypes.oneOf(['light', 'normal', 'semibold', 'bold']).isRequired.tag({
    //   label: 'Divider Font Weight',
    //   defaultValue: 'light',
    // }),
  }),
}

DividerWithTitle.label = 'Divider With Title - R7 Block'
DividerWithTitle.static = true

export default DividerWithTitle
