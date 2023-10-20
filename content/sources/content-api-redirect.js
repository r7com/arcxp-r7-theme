import signImagesInANSObject from '@code-store-platform/sign-image-in-ans-object'
import signingService from '@code-store-platform/signing-service'
import axios from 'axios'
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_TOKEN_VERSION } from 'fusion:environment'

const params = [
  {
    displayName: '_id',
    name: '_id',
    type: 'text',
  },
  {
    displayName: 'website_url',
    name: 'website_url',
    type: 'text',
  },
  {
    default: '2',
    displayName: 'Themes Version',
    name: 'themes',
    type: 'text',
  },
]

const fetch = ({ _id, 'arc-site': website, website_url: websiteUrl }, { cachedCall }) => {
  const urlSearch = new URLSearchParams({
    ...(_id ? { _id } : { website_url: websiteUrl }),
    ...(website ? { website } : {}),
  })

  return axios({
    url: `${CONTENT_BASE}/content/v4/?${urlSearch.toString()}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      'X-R7-APIKEY': 'fb8e85c99b703daf9d1865b0436decc4',
    },
    method: 'GET',
  })
    .then(signImagesInANSObject(cachedCall, signingService.fetch, RESIZER_TOKEN_VERSION))
    .then(({ data }) => data)
    .catch(err => {
      if (err.statusCode === 404 || err.response?.status === 404) {
        const searchParams = new URLSearchParams({
          path: websiteUrl,
          host: website === 'r7' ? `${website}.com` : `${website}.r7.com`,
        })
        return axios
          .get({
            url: `${CONTENT_BASE}/content/v4/content-prost?${searchParams.toString()}`,
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
              'X-R7-APIKEY': 'fb8e85c99b703daf9d1865b0436decc4',
            },
          })
          .then(signImagesInANSObject(cachedCall, signingService.fetch, RESIZER_TOKEN_VERSION))
          .then(({ data }) => {
            console.log('nested', data)
            return {
              statusCode: 200,
              payload: data.alternative_urls,
            }
          })
          .catch(err => {
            console.log('nested err', err)
          })
      }
    })
}

export default {
  fetch,
  params,
}
