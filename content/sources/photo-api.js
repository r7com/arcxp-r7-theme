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
]

const fetch = ({ _id }, { cachedCall }) => {
  if (_id === null) {
    return null
  }
  return axios({
    url: `${CONTENT_BASE}/photo/api/v2/photos/${_id}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
    method: 'GET',
  })
    .then(signImagesInANSObject(cachedCall, signingService.fetch, RESIZER_TOKEN_VERSION))
    .then(({ data }) => data)
    .catch(err => {
      console.log('Error while fetching the photo', err)
    })
}

export default {
  fetch,
  params,
  ttl: 120,
}
