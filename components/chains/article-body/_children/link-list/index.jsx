import './index.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { Paragraph } from '@r7/ui-base-components'

const LinkList = ({ element, classPrefix }) => {
  const { arcSite } = useFusionContext()
  const { primaryColor } = getProperties(arcSite)
  const { items, title } = element
  const COMPONENT_CLASS_NAME = `${classPrefix}-link-list`

  return (
    <div
      className={`${COMPONENT_CLASS_NAME}__container`}
      style={{ borderLeft: `12px solid ${primaryColor}` }}
    >
      <Paragraph fontSize="sm" fontWeight="semibold" as="div">
        <h3 className={`${COMPONENT_CLASS_NAME}__title`} style={{ color: primaryColor }}>
          {title}
        </h3>
      </Paragraph>

      <ul className={`${COMPONENT_CLASS_NAME}__list`}>
        {items.map((listItem, index) => (
          <li key={`${listItem.url}${index}`}>
            <Paragraph as="span" fontSize="xs" fontWeight="bold">
              <a href={listItem.url}>{listItem.content}</a>
            </Paragraph>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LinkList
