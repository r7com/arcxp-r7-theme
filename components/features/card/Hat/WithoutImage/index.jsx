import React from 'react'
import { Card } from '@r7/ui-card'
import '@r7/ui-card/style.css'

export function WithoutImage({ hatTitle }) {
  // return <Card.HatTitle>aaaaaaaa</Card.HatTitle>
  return <Card.HatTitle>{hatTitle}</Card.HatTitle>
}
