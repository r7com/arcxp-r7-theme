import './default.scss'
import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { Paragraph } from '@r7/ui-base-components'
import { RelatedItem } from './RelatedItem'

const SeeAlso = () => {
  const { arcSite, globalContent } = useFusionContext()
  const { primaryColor } = getProperties(arcSite)
  const BLOCK_CLASS_NAME = 'b-see-also'
  if (globalContent.related_content.basic.length) {
    return (
      <div
        className={`${BLOCK_CLASS_NAME}__container`}
        style={{ borderLeft: `12px solid ${primaryColor}` }}
      >
        <Paragraph fontSize="sm" fontWeight="semibold" as="div">
          <h3 className={`${BLOCK_CLASS_NAME}__title`} style={{ color: primaryColor }}>
            Veja também
          </h3>
        </Paragraph>

        <ul className={`${BLOCK_CLASS_NAME}__list`}>
          {globalContent.related_content.basic.map(relatedItem => (
            <RelatedItem
              key={relatedItem._id}
              item={relatedItem}
              className={BLOCK_CLASS_NAME}
              arcSite={arcSite}
            />
          ))}
        </ul>
      </div>
    )
  }
  return null
}

SeeAlso.label = 'See Also - R7 Block'

export default SeeAlso
