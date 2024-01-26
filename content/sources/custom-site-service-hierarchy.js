import axios from 'axios'
import { ARC_ACCESS_TOKEN, CONTENT_BASE } from 'fusion:environment'
import handleFetchError from '@wpmedia/arc-themes-components/src/utils/handle-fetch-error'

const params = {
  hierarchy: 'text',
  sectionId: 'text',
  siteId: 'text',
}

const fetch = ({ hierarchy, sectionId, siteId }) => {
  const urlSearch = new URLSearchParams({
    ...(hierarchy ? { hierarchy } : {}),
    ...(sectionId ? { _id: sectionId } : {}),
  })

  return axios({
    url: `${CONTENT_BASE}/site/v3/navigation/${siteId}?${urlSearch.toString()}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
    method: 'GET',
  })
    .then(({ data }) => {
      if (sectionId && sectionId !== data._id) {
        const error = new Error('Not found')
        error.statusCode = 404
        throw error
      }

      return data
    })
    .catch(handleFetchError)
}

export default {
  fetch,
  params,
  schemaName: 'navigation-hierarchy',
}
