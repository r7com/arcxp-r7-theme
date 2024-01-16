import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import getProperties from 'fusion:properties'
import { useFusionContext } from 'fusion:context'
import { insertFlusher, insertLoader } from '../../../util/taboola-loaders'
import { PAGE_TYPE_MAP } from '../../../util/page-map'

function ArticleTaboola({ customFields }) {
  const { container, placement } = customFields

  const { isAdmin, arcSite, metaValue } = useFusionContext()
  const { taboolaPublisherId } = getProperties(arcSite)

  const pageType = PAGE_TYPE_MAP[metaValue('page-type')] || ''

  const isFieldsValid = container && placement && taboolaPublisherId

  useEffect(() => {
    if (!isAdmin && isFieldsValid) {
      insertLoader(taboolaPublisherId, pageType)
      insertFlusher()
    }
  }, [])

  if (!isFieldsValid) return null

  if (isAdmin) {
    return (
      <div style={{ backgroundColor: '#ffefd5', padding: '20px' }}>
        <small>Taboola widget&nbsp;</small>
        <strong>{placement}</strong>
      </div>
    )
  }

  return (
    <>
      <div id={container} />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              window._taboola = window._taboola || []
              _taboola.push({
                mode: 'thumbs-feed-02-c',
                container: '${container}',
                placement: '${placement}',
                target_type: 'mix'
              })
            `,
        }}
      />
    </>
  )
}

ArticleTaboola.label = 'Article Taboola Feeds - R7 Block'

ArticleTaboola.propTypes = {
  customFields: PropTypes.shape({
    container: PropTypes.string.tag({
      label: 'Taboola Container',
      group: 'Configurações do Taboola',
    }),
    placement: PropTypes.string.tag({
      label: 'Taboola Placement',
      group: 'Configurações do Taboola',
    }),
  }),
}

export default ArticleTaboola
