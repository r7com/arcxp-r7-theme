import { Disclaimer } from '@r7/ui-base-components'
import React from 'react'

function DisabledAdvWarning() {
  return (
    <Disclaimer bgColor="#ffefd5" color="low">
      Esta página está configurada para não exibir publicidades.
      <strong> Esta peça não será exibida.</strong>
    </Disclaimer>
  )
}

export { DisabledAdvWarning }
