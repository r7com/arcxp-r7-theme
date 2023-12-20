import { Text } from '@r7/ui-base-components'
import React from 'react'

export const BriefNews = ({ item, className, primaryColor }) => {
  return (
    <div
      className={`${className}-brief-news__container`}
      style={{ borderLeft: `12px solid ${primaryColor}` }}
    >
      <Text fontSize="sm" fontWeight="semibold" as="div">
        <h3 className={`${className}-brief-news__title`} style={{ color: primaryColor }}>
          {item.config.textTitle}
        </h3>
      </Text>

      <ul className={`${className}-brief-news__list`}>
        {item.config.textList.map((listItem, index) => (
          <li key={`${item.id}${index}`}>
            <Text fontSize="xxs" as="span">
              {listItem}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  )
}
