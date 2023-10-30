import './index.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { Text } from '@r7/ui-base-components'

const CustomEmbed = ({ item }) => {
  const { arcSite } = useFusionContext()
  const { primaryColor } = getProperties(arcSite)
  const { embed, subtype } = item
  const COMPONENT_CLASS_NAME = 'c-custom-embed'
  switch (subtype) {
    case 'brief_news':
      return embed.config ? (
        <div
          className={`${COMPONENT_CLASS_NAME}-brief-news__container`}
          style={{ borderLeft: `12px solid ${primaryColor}` }}
        >
          <Text fontSize="sm" fontWeight="semibold" as="div">
            <h3
              className={`${COMPONENT_CLASS_NAME}-brief-news__container__title`}
              style={{ color: primaryColor }}
            >
              {embed.config.textTitle}
            </h3>
          </Text>

          <ul className={`${COMPONENT_CLASS_NAME}-brief-news__container__list`}>
            {embed.config.textList.map((listItem, index) => (
              <li key={`${embed.id}${index}`}>
                <Text fontSize="xxs" as="span">
                  {listItem}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      ) : null
  }
}

export default CustomEmbed
