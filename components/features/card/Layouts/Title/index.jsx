import React from 'react'
import { Card } from '@r7/ui-card'
import '@r7/ui-card/style.css'

export function Title({ cardTitle }) {
  return (
    <Card.Title as="h2" fontStyle="heading-level-1">
      {cardTitle}
    </Card.Title>
  )
}
