import React from 'react'
import '@r7/ui-article-delivery/style.css'
import '@r7/ui-base-componenets/style.css'
import { useFusionContext } from 'fusion:context'
import { Signature, SocialShare } from '@r7/ui-article-delivery'
import { Heading, Subheading } from '@r7/ui-base-componenets'
import getProperties from 'fusion:properties'

function ArticleHeader() {
  const {
    globalContent: {
      taxonomy,
      last_updated_date,
      first_publish_date,
      created_date,
      credits,
      website,
      headlines,
      subheadlines,
      website_url: websiteUrl = '',
    },
    arcSite,
  } = useFusionContext()
  const { websiteDomain } = getProperties(arcSite)
  const encodedUrl = encodeURI(`${websiteDomain}${websiteUrl}`)

  // A business rule for authors has not yet been established, as arc can send a list of authors and organizations
  const author =
    credits.by.length > 0
      ? credits.by
          .map(credit => `${credit.org ? `por ${credit.org},` : ''} ${credit.name}`)
          .join(', ')
      : ''
  const sectionName = taxonomy
    ? taxonomy?.primary_section.name || taxonomy.sections[0].name
    : website

  return (
    <header>
      <Heading dangerHTML={headlines.basic} />
      <Subheading dangerHTML={subheadlines.basic} />
      <Signature>
        <Signature.Content>
          <Signature.Info
            author={author}
            sectionName={sectionName}
            sectionUrl={`${websiteDomain}${
              taxonomy?.primary_section?.path || taxonomy?.sections[0].path || '/'
            } `}
          />
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
    </header>
  )
}

ArticleHeader.label = 'Article Header - R7'

export default ArticleHeader
