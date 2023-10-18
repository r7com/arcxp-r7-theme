import React from 'react'
import { Card } from '@r7/ui-card'

export function WithoutImage({ hatTitle, color }) {
  return <Card.HatTitle color={color}>{hatTitle}</Card.HatTitle>
}
