import axios from 'axios'
import { ARC_ACCESS_TOKEN, CONTENT_BASE, RESIZER_TOKEN_VERSION } from 'fusion:environment'
import signImagesInANSObject from '@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object'
import handleFetchError from '@wpmedia/arc-themes-components/src/utils/handle-fetch-error'
import { fetch as resizerFetch } from '@wpmedia/signing-service-content-source-block'
import { get } from 'lodash'

const RedirectError = (location, message = 'Redirect', code = 302) => {
  const err = new Error(message)
  err.statusCode = code
  err.location = location
  return err
}

const handleRedirect = response => {
  const content = response.data
  const contentType = content.type
  // const redirectUrl = get(content, 'related_content.redirect[0].redirect_url', null)
  const redirectUrl =
    get(content, 'related_content.redirect[0].redirect_url', null) ||
    get(content, 'redirect_url', null)

  if (contentType && (contentType === 'story' || contentType === 'redirect') && redirectUrl) {
    throw RedirectError(redirectUrl)
  }
  return response
}

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

const fetch = (params, { cachedCall }) => {
  const { _id, 'arc-site': website, website_url: websiteUrl } = params
  const urlSearch = new URLSearchParams({
    ...(_id ? { _id } : { website_url: websiteUrl }),
    ...(website ? { website } : {}),
  })

  return axios({
    url: `${CONTENT_BASE}/content/v4/?${urlSearch.toString()}`,
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
  schemaName: 'ans-item',
}
