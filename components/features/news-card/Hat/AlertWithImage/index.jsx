import React from 'react'
import { Card } from '@r7/ui-card'

export function AlertWithImage({ hatTitle, hatImage, hatImageDescription }) {
  return (
    <Card.HatWrapper type="warning">
      <Card.HatImage imageSource={hatImage} description={hatImageDescription} />
      <Card.HatTitle color="high-bold">{hatTitle}</Card.HatTitle>
    </Card.HatWrapper>
  )
}
