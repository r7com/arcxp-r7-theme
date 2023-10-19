import React from 'react'
import { Card } from '@r7/ui-card'

export function WithImage({ hatImage, hatImageDescription, hatTitle, color }) {
  return (
    <Card.HatWrapper>
      <Card.HatImage imageSource={hatImage} description={hatImageDescription} />
      <Card.HatTitle color={color}>{hatTitle}</Card.HatTitle>
    </Card.HatWrapper>
  )
}
