import React from 'react'
import { Header } from '@r7/ui-header-delivery'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

export const HeaderSocials = () => {
  const { arcSite } = useFusionContext()

  const { facebookPage, twitterUsername, instagramPage } = getProperties(arcSite)
  return (
    <Header.SocialList>
      <Header.SocialItem socialName="facebook" socialUrl={facebookPage} />
      <Header.SocialItem socialName="twitter" socialUrl={twitterUsername} />
      <Header.SocialItem socialName="instagram" socialUrl={instagramPage} />
    </Header.SocialList>
  )
}
