import React from 'react'
import { Card } from '@r7/ui-card'
import { getLabelTypeBySite } from '../../get-label-type-by-site'

/**
 * CardLabel component
 * @typedef {{fallbackImage:string}} CardLabelProps
 * @typedef {ReturnType<typeof import("../../useCard").useCard>} UseCardReturn
 * @param {UseCardReturn["collection"][number]} - CardCollection
 */
export const CardLabel = ({ customFields, taxonomy, fallbackImage }) => {
  const labelBySite = getLabelTypeBySite({ taxonomy })

  if (!customFields.displayLabel && !customFields.sponsoredBy) return null

  // Automatic label but didn't find any label by the path
  if (customFields.label === 'automatic') {
    if (!labelBySite) return null
  } else {
    // Is manual label, but didn't select any option
    if (!customFields.label) return null
  }

  return (
    <Card.Label
      sponsoredByImage={customFields.sponsoredByImage ?? fallbackImage}
      sponsoredByImageDesc={customFields.sponsoredByImageDesc}
      sponsoredByTitle={customFields.sponsoredByTitle}
      sponsoredByUrl={customFields.sponsoredByUrl}
      type={
        customFields.sponsoredBy
          ? 'sponsored-by'
          : customFields.label === 'automatic'
          ? labelBySite
          : customFields.label
      }
    />
  )
}
