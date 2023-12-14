/* eslint-disable no-undef */

import React, { useEffect, useCallback } from 'react'
import PropTypes from '@arc-fusion/prop-types'
import R7ArcAdsInstance from '../R7AdInstance'

const R7AdUnit = props => {
  const { adConfig, featureConfig } = props
  const { id } = adConfig
  const {
    customFields: { debug },
    siteProperties,
  } = featureConfig

  const registerAd = useCallback(() => {
    const publisherIds = { dfp_publisher_id: siteProperties.dfpId }
    R7ArcAdsInstance.getInstance(siteProperties, () => {
      window.googletag = window.googletag || {}
      window.googletag.cmd = window.googletag.cmd || []
      window.googletag.cmd.push(() => {
        window.googletag
          .pubads()
          .setTargeting('pos', 'posicaodobanner')
          .setTargeting('context', 'contextodobanner')
      })
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

R7AdUnit.propTypes = {
  adConfig: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slotName: PropTypes.string.isRequired,
    adType: PropTypes.string.isRequired,
    adClass: PropTypes.string.isRequired,
    dimensions: PropTypes.array.isRequired,
    sizemap: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
  }).isRequired,
  featureConfig: PropTypes.shape({
    siteProperties: PropTypes.shape({
      dfpId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }),
}

export default R7AdUnit
