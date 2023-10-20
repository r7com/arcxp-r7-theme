import React from 'react'
import { Card } from '@r7/ui-card'

export function BreakingNews({ hatTitle }) {
  return (
    <Card.HatWrapper type="warning">
      <Card.HatTitle color="high-bold">{hatTitle}</Card.HatTitle>
    </Card.HatWrapper>
  )
}
