import './index.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { Paragraph } from '@r7/ui-base-components'

const Quote = ({ element, classPrefix }) => {
  const { arcSite } = useFusionContext()
  const { primaryColor, _id } = getProperties(arcSite)
  const { citation, content_elements } = element
  const COMPONENT_CLASS_NAME = `${classPrefix}-quote`

  return (
    <>
      {content_elements.length
        ? content_elements.map(contentItem => {
            return (
              <div
                key={`${contentItem.type}${_id}`}
                className={`${COMPONENT_CLASS_NAME}__container`}
                style={{ borderLeft: `12px solid ${primaryColor}` }}
              >
                <Paragraph fontSize="sm" fontWeight="bold" as="div">
                  <blockquote
                    className={`${COMPONENT_CLASS_NAME}__title`}
                    style={{ color: primaryColor }}
                    dangerouslySetInnerHTML={{ __html: contentItem.content }}
                  ></blockquote>
                </Paragraph>
                <Paragraph fontSize="little" as="p">
                  <span className={`${COMPONENT_CLASS_NAME}__author`}>{`${
                    citation.content.length ? `(${citation.content})` : ''
                  }`}</span>
                </Paragraph>
              </div>
            )
          })
        : null}
    </>
  )
}

export default Quote
