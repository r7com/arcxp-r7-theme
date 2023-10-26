import React from 'react'
import { Header } from '@r7/ui-header-delivery'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { getSectionSocial } from '../../util/getSectionSocial'

export const HeaderSocials = () => {
  const { arcSite, globalContent } = useFusionContext()

  const { facebookPage, twitterUsername, instagramPage } = getProperties(arcSite)

  const facebookURL = getSectionSocial('facebook', globalContent) || facebookPage
  const twitterURL = getSectionSocial('twitter', globalContent) || twitterUsername
  const instagramURL = getSectionSocial('instagram', globalContent) || instagramPage
  return (
    <Header.SocialList>
      <Header.SocialItem socialName="facebook" socialUrl={facebookURL} />
      <Header.SocialItem socialName="twitter" socialUrl={twitterURL} />
      <Header.SocialItem socialName="instagram" socialUrl={instagramURL} />
    </Header.SocialList>
  )
}
