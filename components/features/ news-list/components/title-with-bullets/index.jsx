import React from 'react'
import { Bullet } from '@r7/ui-base-components'
import { Card } from '@r7/ui-card'
import './index.scss'

export const TitleWithBullets = ({ contentElements }) => {
  console.log('asdqewqwe', contentElements)

  //verificar agencia
  return (
    <div className="title-with-bullets">
      <div className="title-with-bullets__highlight">
        <Card
          className="title-with-bullets__highlight-title"
          newsUrl={contentElements[0].canonical_url}
          newsUrlTitle={contentElements[0]?.headlines?.basic}
        >
          <Card.HatWrapper>
            <Card.HatTitle>{contentElements[0]?.taxonomy?.primary_section?.name}</Card.HatTitle>
          </Card.HatWrapper>
          <Card.Title fontStyle="heading-level-1" as="h2">
            {contentElements[0]?.headlines?.basic}
          </Card.Title>
        </Card>
      </div>
      <div className="title-with-bullets__wrapper">
        <Bullet url={contentElements[1].canonical_url} size="large">
          {contentElements[1]?.headlines?.basic}
        </Bullet>
        <Bullet url={contentElements[2].canonical_url} size="large">
          {contentElements[2]?.headlines?.basic}
        </Bullet>
      </div>
    </div>
  )
}
