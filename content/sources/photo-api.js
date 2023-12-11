import axios from 'axios'
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_TOKEN_VERSION } from 'fusion:environment'
import signImagesInANSObject from '@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object'
import handleFetchError from '@wpmedia/arc-themes-components/src/utils/handle-fetch-error'
import handleRedirect from '@wpmedia/arc-themes-components/src/utils/handle-redirect'
import { fetch as resizerFetch } from '@wpmedia/signing-service-content-source-block'

const params = [
  {
    displayName: '_id',
    name: '_id',
    type: 'text',
  },
]

const fetch = ({ _id }, { cachedCall }) => {
  return axios({
    url: `${CONTENT_BASE}/photo/api/v2/photos/${_id}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
    method: 'GET',
  })
    .then(handleRedirect)
    .then(signImagesInANSObject(cachedCall, resizerFetch, RESIZER_TOKEN_VERSION))
    .then(({ data }) => data)
    .catch(handleFetchError)
}

export default {
  fetch,
  params,
  ttl: 120,
}
