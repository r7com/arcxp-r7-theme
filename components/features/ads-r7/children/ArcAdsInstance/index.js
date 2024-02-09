/* eslint-disable */
// istanbul ignore file
import { ArcAds } from 'arcads'
import { addLiveramp } from '../../utils/ad-adapters-configs'

export const logEvent = (evt, debug = false) => {
  if (debug) {
    if (evt && evt.creativeId) {
      console.info(`Advertisement ${evt.creativeId} has loaded...`, evt)
    } else {
      console.info('Advertisement did not load...', evt)
    }
  }
}

class ArcAdsInstance {
  static instance
  static properties
  static getInstance(properties, callback) {
    if (ArcAdsInstance.instance == null) {
      ArcAdsInstance.properties = properties
      ArcAdsInstance.instance = new ArcAdsInstance()
      if (callback) callback()
    }
    return this.instance
  }

  constructor() {
    this.initArcAds = this.initArcAds.bind(this)
    this.registerAd = this.registerAd.bind(this)
  }

  initArcAds({ publisherIds, debug = false }) {
    if (!this.arcAds) {
      addLiveramp()
      const { dfp_publisher_id: id } = publisherIds
      const arcAdsConfig = {
        dfp: {
          id,
        },
        bidding: {
          prebid: {
            enabled: true,
            timeout: 3000,
            bids: [],
          },
          amazon: {
            enabled: true,
            id: '2d3489e5-6204-413c-9ba8-96ff17e7c327',
          },
        },
      }
      this.arcAds = new ArcAds(arcAdsConfig, evt => {
        logEvent(evt, debug)
      })
    }
  }

  registerAd(props, cb) {
    const { params, disableAds } = props
    if (disableAds) return
    this.initArcAds(props)
    this.arcAds.registerAd({
      ...params,
      ...(cb ? { prerender: cb } : {}),
    })
  }
}

export default ArcAdsInstance
