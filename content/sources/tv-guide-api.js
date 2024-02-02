import { TV_GUIDE_API } from 'fusion:environment'
import axios from 'axios'
import handleFetchError from '@wpmedia/arc-themes-components/src/utils/handle-fetch-error'

const fetch = ({ id, startDate, endDate }) => {
  return axios({
    url: `${TV_GUIDE_API}/grids/${id}/events?start_date=${startDate}&end_date=${endDate}`,
    method: 'GET',
  })
    .then(({ data }) => data)
    .catch(handleFetchError)
}

export default {
  fetch,
  params: {
    id: 'text',
    startDate: 'text',
    endDate: 'text',
  },
}
