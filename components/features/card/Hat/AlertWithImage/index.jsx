import React from 'react'
import { Card } from '@r7/ui-card'
import '@r7/ui-card/style.css'

export function AlertWithImage({ hatTitle, hatImage, hatImageDescription }) {
  return (
    <Card.HatWrapper type="alert">
      <Card.HatImage
        // imageSource="//img.r7.com/images/concurso-publico-14032022123440824?dimensions=128x128"
        imageSource={hatImage}
        // description="Human hand writting in a paper"
        description={hatImageDescription}
      />
      <Card.HatTitle color="alert">{hatTitle}</Card.HatTitle>
    </Card.HatWrapper>
  )
}
