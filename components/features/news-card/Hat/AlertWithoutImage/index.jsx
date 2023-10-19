import React from 'react'
import { Card } from '@r7/ui-card'

export function AlertWithoutImage({ hatTitle }) {
  return (
    <Card.HatWrapper type="alert">
      <Card.HatTitle color="alert">{hatTitle}</Card.HatTitle>
    </Card.HatWrapper>
  )
}
