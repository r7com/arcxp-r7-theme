import React from 'react'
import { Card } from '@r7/ui-card'

export function AlertWithImage({ hatTitle, hatImage, hatImageDescription }) {
  return (
    <Card.HatWrapper type="alert">
      <Card.HatImage imageSource={hatImage} description={hatImageDescription} />
      <Card.HatTitle color="alert">{hatTitle}</Card.HatTitle>
    </Card.HatWrapper>
  )
}
