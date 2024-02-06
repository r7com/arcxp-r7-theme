import signImagesInANSObject from '@code-store-platform/sign-image-in-ans-object'
import signingService from '@code-store-platform/signing-service'
import handleFetchError from '@wpmedia/arc-themes-components/src/utils/handle-fetch-error'
import axios from 'axios'
import {
  ARC_ACCESS_TOKEN,
  CONTENT_BASE,
  RESIZER_TOKEN_VERSION,
  MIGRATION_DATE,
  API_REDIRECT_KEY,
  HOST_LEGACY_REDIRECT,
} from 'fusion:environment'
import { formatDate, getDateFromUrl } from './utils/date'

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
    },
    method: 'GET',
  })
    .then(handleRedirect)
    .then(signImagesInANSObject(cachedCall, signingService.fetch, RESIZER_TOKEN_VERSION))
    .then(({ data }) => data)
    .catch(err => {
      if (err.statusCode === 404 || err.response?.status === 404) {
        const host = website === 'r7' ? `${website}.com` : `${website}.r7.com`
        const cleanedWebsiteUrl = websiteUrl.endsWith('/') ? websiteUrl.slice(0, -1) : websiteUrl
        const articleStringDate = getDateFromUrl(cleanedWebsiteUrl)

        if (articleStringDate) {
          const articleDate = formatDate(articleStringDate)
          const migrationDate = formatDate(MIGRATION_DATE)
          const isBeforeMigration = articleDate < migrationDate

          if (isBeforeMigration) {
            console.log('URL ENDPOINT', `https://${HOST_LEGACY_REDIRECT}${cleanedWebsiteUrl}`)
            return axios
              .get({
                url: `https://${HOST_LEGACY_REDIRECT}${cleanedWebsiteUrl}`,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${API_REDIRECT_KEY}`,
                  Host: host,
                },
              })
              .then(({ data }) => {
                console.log('nested', data)
                return data
              })
              .catch(err => {
                console.log('Nested Error', err)
                handleFetchError(err)
                return err
              })
          }
        }
      }
    })
}

export default {
  fetch,
  params,
  ttl: 120,
}
