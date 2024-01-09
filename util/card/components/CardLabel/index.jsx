import React from 'react'
import { Card } from '@r7/ui-card'
import { getLabelTypeBySite } from '../../get-label-type-by-site'

/** CardLabel component */
export const CardLabel = ({
  displayLabel,
  label,
  sponsoredBy,
  sponsoredByImage,
  sponsoredByImageDesc,
  sponsoredByTitle,
  sponsoredByUrl,
  taxonomy,
  fallbackImage,
}) => {
  const labelBySite = getLabelTypeBySite({ taxonomy })

  if (!displayLabel && !sponsoredBy) return null

  // Automatic label but didn't find any label by the path
  if (label === 'automatic') {
    if (!labelBySite) return null
  } else {
    // Is manual label, but didn't select any option
    if (!label) return null
  }

  return (
    <Card.Label
      sponsoredByImage={sponsoredByImage ?? fallbackImage}
      sponsoredByImageDesc={sponsoredByImageDesc}
      sponsoredByTitle={sponsoredByTitle}
      sponsoredByUrl={sponsoredByUrl}
      type={sponsoredBy ? 'sponsored-by' : label === 'automatic' ? labelBySite : label}
    />
  )
}
