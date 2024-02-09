import axios from 'axios'
import {
  ARC_ACCESS_TOKEN,
  CONTENT_BASE,
  RESIZER_TOKEN_VERSION,
  MIGRATION_DATE,
  API_REDIRECT_KEY,
  HOST_LEGACY_REDIRECT,
} from 'fusion:environment'
import signImagesInANSObject from '@wpmedia/arc-themes-components/src/utils/sign-images-in-ans-object'
import handleFetchError from '@wpmedia/arc-themes-components/src/utils/handle-fetch-error'
import { fetch as resizerFetch } from '@wpmedia/signing-service-content-source-block'
import { get } from 'lodash'
import { formatDate, getDateFromUrl } from '../../util/date'

const RedirectError = (location, message = 'Redirect', code = 302) => {
  const err = new Error(message)
  err.statusCode = code
  err.location = location
  return err
}

const handleRedirect = response => {
  const content = response.data
  const contentType = content.type
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
    .catch(err => {
      if (err.statusCode !== 404 && err.response?.status !== 404) {
        handleFetchError(err)
        return err
      }

      const host = website === 'r7' ? `${website}.com` : `${website}.r7.com`
      // the prost/schumi not include slash at the end url but the arc yes
      const urlWithoutSlashAtTheEnd = websiteUrl.endsWith('/')
        ? websiteUrl.slice(0, -1)
        : websiteUrl
      const articleStringDate = getDateFromUrl(urlWithoutSlashAtTheEnd)
      const articleDate = articleStringDate && formatDate(articleStringDate)
      const migrationDate = formatDate(MIGRATION_DATE)
      const isBeforeMigration = articleDate && articleDate < migrationDate

      if (isBeforeMigration) {
        return axios
          .get(`http://${HOST_LEGACY_REDIRECT}${urlWithoutSlashAtTheEnd}`, {
            headers: {
              Authorization: `Bearer ${API_REDIRECT_KEY}`,
              Host: host,
            },
          })
          .then(({ data }) => ({ html: data, legacyRedirect: true }))
          .catch(err => {
            console.log('Nested Error', err)
            handleFetchError(err)
          })
      }
      handleFetchError(err)
    })
}

export default {
  fetch,
  params,
  schemaName: 'ans-item',
}
