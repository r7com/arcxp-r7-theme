import { smartConfigs } from './smart-configs'

function addSmart(bids) {
  bids.unshift({
    bidder: 'smartadserver',
    params: {
      domain: 'https://prg.smartadserver.com',
      siteId: smartConfigs.global.siteId,
      pageId: smartConfigs.global.pageId,
      // formatId: formatId,
    },
  })
}

function addLiveramp() {
  pbjs.setConfig({
    userSync: {
      userIds: [
        {
          name: 'identityLink',
          params: {
            pid: '13919',
            notUse3P: false,
          },
          storage: {
            type: 'cookie',
            name: 'idl_env',
            expires: 15,
            refreshInSeconds: 1800,
          },
        },
      ],
      syncDelay: 3000,
    },
  })
}

function addRubicon(bids, id) {
  bids.push({
    bidder: 'rubicon',
    params: {
      accountId: '15284',
      siteId: '181560',
      zoneId: '885996',
      inventory: {
        adunit: id,
      },
    },
  })
}

function addTeads(bids, id, dimensions) {
  // PER-6812: Teads é válido apenas para peças 300x250
  console.log(dimensions)
  bids.push({
    bidder: 'teads',
    params: {
      placementId: 152515,
      pageId: 138995,
      inventory: {
        adunit: id,
      },
    },
  })
}

export { addSmart, addLiveramp, addRubicon, addTeads }
