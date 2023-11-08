import React from 'react'
import '@r7/ui-article-delivery/style.css'
import { useFusionContext } from 'fusion:context'
import { Signature } from '@r7/ui-article-delivery'
import getProperties from 'fusion:properties'
import { formatAuthors } from '@wpmedia/arc-themes-components'
import { getSectionInfo } from '../../../utils/getSectionInfo'

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
    <header>
      <h1>{headlines.basic}</h1>
      <h2>{subheadlines.basic}</h2>
      <Signature>
        <Signature.Content>
          <Signature.Info author={author} sectionName={sectionName} sectionUrl={sectionUrl} />
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
