import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import getProperties from 'fusion:properties'
import { useFusionContext } from 'fusion:context'
import { insertFlusher, insertLoader } from '../../../util/taboola-loaders'
import { PAGE_TYPE_MAP } from '../../../util/page-map'
import { Disclaimer } from '@r7/ui-base-components'
import { getSectionPropsContent } from '../../../util/get-section-props-content'

function Taboola({ customFields }) {
  const { container, placement, mode } = customFields
  const { isAdmin, arcSite, metaValue } = useFusionContext()
  const { taboolaPublisherId } = getProperties(arcSite)

  const pageType = PAGE_TYPE_MAP[metaValue('page-type')] || ''
  const isFieldsValid = container && placement && mode && taboolaPublisherId
  const sectionPropsContent = getSectionPropsContent()
  const disableTaboola = JSON.parse(sectionPropsContent?.publicidade?.disable_taboola || false)

  useEffect(() => {
    if (!isAdmin && isFieldsValid && !disableTaboola) {
      insertLoader(taboolaPublisherId, pageType)
      insertFlusher()
    }
  }, [])

  if (!isFieldsValid) return null

  if (isAdmin) {
    return (
      <div>
        {disableTaboola && (
          <Disclaimer bgColor="#ffefd5" color="low">
            Esta página está configurada para não exibir Taboola.
            <strong> Este widget não será exibido.</strong>
          </Disclaimer>
        )}
        <div style={{ backgroundColor: '#ffefd5', padding: '20px' }}>
          <small>Taboola widget&nbsp;</small>
          <strong>{placement}</strong>
        </div>
      </div>
    )
  }

  return (
    <>
      {!disableTaboola && (
        <>
          <div id={container} />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                window._taboola = window._taboola || []
                _taboola.push({
                  mode: '${mode}',
                  container: '${container}',
                  placement: '${placement}',
                  target_type: 'mix'
                })
              `,
            }}
          />
        </>
      )}
    </>
  )
}

Taboola.label = 'Taboola Feeds - R7 Block'

Taboola.propTypes = {
  customFields: PropTypes.shape({
    container: PropTypes.string.tag({
      label: 'Taboola Container',
      group: 'Configurações do Taboola',
    }),
    placement: PropTypes.string.tag({
      label: 'Taboola Placement',
      group: 'Configurações do Taboola',
    }),
    mode: PropTypes.string.tag({
      label: 'Taboola Mode',
      group: 'Configurações do Taboola',
      defaultValue: 'thumbs-feed-02-c',
    }),
  }),
}

export default Taboola
