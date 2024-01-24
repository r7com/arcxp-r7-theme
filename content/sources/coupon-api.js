import { COUPON_API, COUPON_TOKEN } from 'fusion:environment'
import axios from 'axios'

const fetch = async query => {
  const { data } = await axios({
    url: `${COUPON_API}${query.category}`,
    headers: {
      'content-type': 'application/json',
      Authorization: COUPON_TOKEN,
    },
  })

  return data
}

export default {
  fetch,
  params: {
    category: '',
  },
}
