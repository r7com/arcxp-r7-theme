import React from 'react'
import { Paragraph, Stack } from '@wpmedia/arc-themes-components'
import { AdShell } from '@r7/ui-base-components'
import '@r7/ui-base-components/style.css'

const ArcAdminAd = ({ adType, slotName, dimensions, layout }) => (
  <AdShell layout={layout}>
    <Stack className="b-ads-block--admin">
      <Stack>
        <Paragraph>{adType || 'Ad Name N/A'}</Paragraph>
        <Paragraph>{slotName}</Paragraph>
      </Stack>
      <Paragraph>{JSON.stringify(dimensions)}</Paragraph>
    </Stack>
  </AdShell>
)

export default ArcAdminAd
