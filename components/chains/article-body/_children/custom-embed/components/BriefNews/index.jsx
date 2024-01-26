import { Typography } from '@r7/ui-base-components'
import React from 'react'

export const BriefNews = ({ item, className, primaryColor }) => {
  if (!item) return
  return (
    <div
      className={`${className}-brief-news__container`}
      style={{ borderLeft: `12px solid ${primaryColor}` }}
    >
      <Typography fontSize="sm" fontWeight="semibold" as="div">
        <h3 className={`${className}-brief-news__title`} style={{ color: primaryColor }}>
          {item.config?.textTitle}
        </h3>
      </Typography>

      <ul className={`${className}-brief-news__list`}>
        {item?.config?.textList.map((listItem, index) => (
          <li key={`${item.id}${index}`}>
            <Typography fontSize="xxs" as="span">
              {listItem}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}
