import React from 'react'
import '@r7/ui-article-delivery/style.css'
import { useFusionContext } from 'fusion:context'
import { Signature } from '@r7/ui-article-delivery'
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
      <h1>{headlines.basic}</h1>
      <h2>{subheadlines.basic}</h2>
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
      {/* social share */}
      <a href={encodedUrl}>Url Redes sociais</a>
    </header>
  )
}

ArticleHeader.label = 'Article Header - R7'

export default ArticleHeader
