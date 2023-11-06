import axios from 'axios'
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'
import _ from 'lodash'

const params = {
  path: 'text',
  hierarchy: 'text',
  sectionId: 'text',
}

const api = axios.create({
  baseURL: CONTENT_BASE,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
  },
})

const fetch = async query => {
  if (!query.path) {
    return { value: null }
  }

  const website = query['arc-site']

  let value = null
  let sectionGetQuery = {
    sectionId: query.sectionId,
    hierarchy: query.hierarchy,
  }

  try {
    while (value === null) {
      const section = await fetchSection({ ...sectionGetQuery, website })

      value = _.get(section, query.path, null)
      const parentSectionId = section?.parent?.default

      if (!parentSectionId) {
        break
      }

      sectionGetQuery = {
        sectionId: parentSectionId,
      }
    }
  } catch (e) {
    return {
      err: e.message,
    }
  }

  return { value: value || '' }
}

const fetchSection = async query => {
  const { sectionId, hierarchy, website } = query

  const urlSearch = new URLSearchParams()

  if (hierarchy) {
    urlSearch.append('hierarchy', hierarchy)
  }

  if (sectionId) {
    urlSearch.append('_id', sectionId)
  }

  const url = `/site/v3/navigation/${website}?${urlSearch.toString()}`
  const response = await api.get(url)
  const { data } = response

  if (sectionId && sectionId !== data._id) {
    const error = new Error(`Not found ${url}`)
    error.statusCode = 404
    throw error
  }

  return data
}

export default {
  fetch,
  params,
}
