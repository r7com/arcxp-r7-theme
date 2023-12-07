import React from 'react'
import '@r7/ui-article-delivery/style.css'
import { useFusionContext } from 'fusion:context'
import { Signature, SocialShare } from '@r7/ui-article-delivery'
import { Heading, Subheading } from '@r7/ui-base-components'
import getProperties from 'fusion:properties'
import { formatAuthors } from '@wpmedia/arc-themes-components'
import { getSectionInfo } from '../../../util/get-section-info'

function ArticleHeader() {
  const { globalContent, arcSite } = useFusionContext()

  if (!globalContent) return null

  const {
    last_updated_date,
    first_publish_date,
    created_date,
    credits,
    headlines,
    subheadlines,
    website_url: websiteUrl = '',
  } = globalContent
  const { websiteDomain } = getProperties(arcSite)
  const encodedUrl = encodeURI(`${websiteDomain}${websiteUrl}`)
  const bylineNodes = formatAuthors(credits?.by, 'e')
  const author = bylineNodes?.length > 0 ? <span>{bylineNodes}</span> : ''
  const { sectionName, sectionUrl } = getSectionInfo(globalContent, arcSite)

  return (
    <ArticleHeader>
      <ArticleHeader.Heading>
        <Heading dangerHTML={headlines.basic} />
        <Subheading dangerHTML={subheadlines.basic} />
      </ArticleHeader.Heading>
      <ArticleHeader.Topbar>
        <Signature>
          <Signature.Content>
            <Signature.Info author={author} sectionName={sectionName} sectionUrl={sectionUrl} />
            <Signature.Date
              modified={last_updated_date}
              published={first_publish_date || created_date}
            />
          </Signature.Content>
        </Signature>
        <SocialShare>
          <SocialShare.List>
            <SocialShare.Item link={encodedUrl} title={headlines.basic} name="twitter" />
            <SocialShare.Item link={encodedUrl} title={headlines.basic} name="facebook" />
            <SocialShare.Item link={encodedUrl} title={headlines.basic} name="linkedin" />
            <SocialShare.Item link={encodedUrl} title={headlines.basic} name="whatsapp" />
            <SocialShare.Item link={encodedUrl} title={headlines.basic} name="googleNews" />
            <SocialShare.Item link={encodedUrl} title={headlines.basic} name="share" />
          </SocialShare.List>
        </SocialShare>
      </ArticleHeader.Topbar>
    </ArticleHeader>
  )
}

ArticleHeader.label = 'Article Header - R7'

export default ArticleHeader
