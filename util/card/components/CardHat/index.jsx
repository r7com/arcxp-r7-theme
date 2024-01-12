import React from 'react'
import { Card } from '@r7/ui-card'
import { getHatBySite } from '../../get-hat-by-site'

/** CardHat component */
export function CardHat({ taxonomy, color }) {
  const { image, name } = getHatBySite({ taxonomy })

  return (
    <Card.HatWrapper>
      {image && <Card.HatImage imageSource={image} description={name} />}
      <Card.HatTitle color={color}>{name}</Card.HatTitle>
    </Card.HatWrapper>
  )
}
