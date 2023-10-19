import React from 'react'
import { Card } from '@r7/ui-card'

export function Title({ cardTitle }) {
  return (
    <Card>
      <Card.Title as="h2" fontStyle="heading-level-1">
        {cardTitle}
      </Card.Title>
    </Card>
  )
}
