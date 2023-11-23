import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'

function ArticleTaboola({ customFields }) {
  const { container, placement } = customFields

  const { isAdmin } = useFusionContext()

  if (isAdmin) {
    return (
      <div className="tbl-wrapper" style={{ backgroundColor: '#ffefd5', padding: '20px' }}>
        <small>Taboola widget&nbsp;</small>
        <strong>{placement}</strong>
      </div>
    )
  }

  return (
    <>
      <div id={container}></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window._taboola = window._taboola || [];
            _taboola.push({
              mode: 'thumbs-feed-02-c',
              container: '${container}',
              placement: '${placement}',
              target_type: 'mix'
            });
          `,
        }}
      ></script>
    </>
  )
}

ArticleTaboola.label = 'Article Taboola Feeds - R7 Block'

ArticleTaboola.propTypes = {
  customFields: PropTypes.shape({
    container: PropTypes.string.tag({
      label: 'Taboola Container',
      group: 'Configure Taboola Widget',
    }),
    placement: PropTypes.string.tag({
      label: 'Taboola Placement',
      group: 'Configure Taboola Widget',
    }),
  }),
}

export default ArticleTaboola
