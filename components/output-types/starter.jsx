import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

function StarterOutputType({
  children,
  contextPath,
  deployment,
  CssLinks,
  Fusion,
  Libs,
  MetaTags,
}) {
  const { globalContent, arcSite } = useFusionContext()
  const { locale = 'en' } = getProperties(arcSite)
  return (
    <html lang={locale}>
      <head>
        <title>Fusion Article</title>
        {globalContent?.additional_properties?.canonical_url && (
          <link rel="canonical" href={globalContent.additional_properties.canonical_url} />
        )}
        {globalContent?.label?.noindex?.text === 'Yes' && <meta name="robots" content="noindex" />}
        <MetaTags />
        <Libs />
        <CssLinks />
        <link
          rel="icon"
          type="image/x-icon"
          href={deployment(`${contextPath}/resources/favicon.ico`)}
        />
      </head>
      <body>
        <div id="fusion-app">{children}</div>
        <Fusion />
      </body>
    </html>
  )
}

export default StarterOutputType
