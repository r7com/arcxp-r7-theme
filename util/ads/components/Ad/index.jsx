import React, { useCallback, useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { addRubicon, addSmart, addTeads } from '../../utils/ad-adapters-configs'
import ArcAdsInstance from '../../utils/arc-ads-instance'
import { setPageTargeting } from '../../utils/ad-helper'
import { adConfig } from '../../utils/ad-config'

export const Ad = ({ id, pos, context, dimensions }) => {
  const { arcSite } = useFusionContext()
  const fusionContext = useFusionContext()
  const siteProperties = getProperties(arcSite)

  const registerAd = useCallback(() => {
    const publisherIds = { dfp_publisher_id: siteProperties.dfpId }
    const adConfigs = adConfig({ dimensions, slotName: siteProperties.hash, pos, context, id })

    addSmart(adConfigs.bidding.prebid.bids, adConfigs.dimensions)
    addRubicon(adConfigs.bidding.prebid.bids, adConfigs.id)
    addTeads(adConfigs.bidding.prebid.bids, adConfigs.id, adConfigs.dimensions)

    ArcAdsInstance.getInstance(siteProperties, () => {
      setPageTargeting(fusionContext)
    }).registerAd({
      params: adConfigs,
      publisherIds,
      debug: false,
    })
  }, [])

  useEffect(() => {
    registerAd()
  }, [registerAd])

  return <div id={id} />
}
