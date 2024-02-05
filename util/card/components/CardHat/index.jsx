import React from 'react'
import { Card } from '@r7/ui-card'
import { getHatBySite } from '../../get-hat-by-site'

/**
 * CardHat component
 * @typedef {{type: "warning" | undefined}} CardHatWrapperProps
 * @typedef {{color: "high" | "low" | "high-bold", size: "small" | "medium"}} CardHatTitleProps
 * @typedef {ReturnType<typeof import("../../useCard").useCard>} UseCardReturn
 * @typedef {UseCardReturn["content"]["content_elements"][number]} ContentElement
 * @param {ContentElement & CardHatTitleProps & CardHatWrapperProps} - CardCollection
 */
export function CardHat({ canonical_url, headlines, taxonomy, color, type }) {
  const { image, name } = getHatBySite({ taxonomy })

  return (
    <Card.HatWrapper type={type}>
      <a href={canonical_url} title={headlines?.basic}>
        {image && <Card.HatImage imageSource={image} description={name} />}
        <Card.HatTitle color={color}>{name}</Card.HatTitle>
      </a>
    </Card.HatWrapper>
  )
}
