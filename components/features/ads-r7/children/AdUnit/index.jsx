import React, { useEffect, useCallback } from 'react'
import PropTypes from '@arc-fusion/prop-types'
import ArcAdsInstance from '../ArcAdsInstance'
import { setPageTargeting } from '../../utils/ad-helper'
import { addRubicon, addSmart, addTeads } from '../../utils/ad-adapters-configs'

const AdUnit = props => {
  const { adConfig, featureConfig } = props
  const { id } = adConfig
  const {
    customFields: { debug },
    siteProperties,
  } = featureConfig

  const registerAd = useCallback(() => {
    const publisherIds = { dfp_publisher_id: siteProperties.dfpId }

    adConfig.bidding = {
      prebid: {
        enabled: true,
        timeout: 3000,
        bids: [],
      },
    }

    addSmart(adConfig.bidding.prebid.bids, adConfig.dimensions)
    addRubicon(adConfig.bidding.prebid.bids, adConfig.id)
    addTeads(adConfig.bidding.prebid.bids, adConfig.id, adConfig.dimensions)

    ArcAdsInstance.getInstance(siteProperties, () => {
      setPageTargeting(featureConfig)
    }).registerAd({
      params: adConfig,
      publisherIds,
      debug,
    })
  }, [adConfig, debug, featureConfig, siteProperties])

  useEffect(() => {
    registerAd()
  }, [registerAd])

  return <div id={id} />
}

AdUnit.propTypes = {
  adConfig: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slotName: PropTypes.string.isRequired,
    dimensions: PropTypes.array.isRequired,
    sizemap: PropTypes.object.isRequired,
  }).isRequired,
  featureConfig: PropTypes.shape({
    siteProperties: PropTypes.shape({
      dfpId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }),
}

export default AdUnit
