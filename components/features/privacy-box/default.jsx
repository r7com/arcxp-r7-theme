import React from 'react'
import { PrivacyBox } from '@r7/ui-base-components'
import PropTypes from '@arc-fusion/prop-types'
import { useFusionContext } from 'fusion:context'

function PrivacyBoxBlock({ customFields }) {
  const { link } = customFields
  const { isAdmin } = useFusionContext()

  function getCookie(cname) {
    const cookies = globalThis.document !== undefined && document.cookie
    const cookieRX = new RegExp(`(?:^|; )${cname}=([^;]*)`)

    const matches = cookies.match(cookieRX)

    return matches ? decodeURIComponent(matches[1]) : null
  }

  if (isAdmin && getCookie('r7_lgpd_accepted')) {
    return (
      <div style={{ backgroundColor: '#ffefd5', padding: '20px' }}>
        <strong>Box de privacidade</strong>
      </div>
    )
  }
  return <PrivacyBox link={link} />
}

PrivacyBoxBlock.propTypes = {
  customFields: PropTypes.shape({
    link: PropTypes.string.tag({
      label: 'Link de Termos e Condições Gerais de Uso do R7',
      defaultValue: 'https://www.r7.com/termos-e-condicoes',
    }),
  }),
}

PrivacyBoxBlock.label = 'Box de privacidade - R7 Block'

export default PrivacyBoxBlock
