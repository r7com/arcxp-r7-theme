import React from 'react'
import { Card } from '@r7/ui-card'
import { Hat } from '../../Hat'

export function Title({ cardTitle, hatType, hatImage, hatImageDescription, hatTitle }) {
  return (
    <Card>
      <Hat
        type={hatType}
        hatImage={hatImage}
        hatImageDescription={hatImageDescription}
        hatTitle={hatTitle}
      />
      <Card.Title as="h2" fontStyle="heading-level-1">
        {cardTitle}
      </Card.Title>
    </Card>
  )
}
