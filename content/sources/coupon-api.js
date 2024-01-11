import { COUPON_API } from 'fusion:environment'

const resolve = query => {
  return `${COUPON_API}${query.category}`
}

export default {
  resolve,
  params: {
    category: '',
  },
}
