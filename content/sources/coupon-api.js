import { COUPON_API, COUPON_TOKEN } from 'fusion:environment'
import axios from 'axios'

const fetch = query => {
  return axios({
    url: `${COUPON_API}${query.category}`,
    headers: {
      'content-type': 'application/json',
      Authorization: COUPON_TOKEN,
    },
  }).then(({ data }) => data)
}

export default {
  fetch,
  params: {
    category: '',
  },
}
