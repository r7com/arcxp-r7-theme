import React from 'react'
import { Card } from '@r7/ui-card'
import { getLabelTypeBySite } from '../../helpers'

/**
 * CardLabel component
 * @typedef {{fallbackImage:string}} CardLabelProps
 * @typedef {ReturnType<typeof import("../../use-card").useCard>} UseCardReturn
 * @param {UseCardReturn["collection"][number]} - CardCollection
 */
export const CardLabel = ({ customFields, taxonomy, fallbackImage }) => {
  const labelBySite = getLabelTypeBySite({ taxonomy })

  if (!customFields?.label) return null

  const {
    displayLabel,
    sponsoredBy,
    label,
    sponsoredByImage,
    sponsoredByImageDesc,
    sponsoredByTitle,
    sponsoredByUrl,
  } = customFields.label

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
