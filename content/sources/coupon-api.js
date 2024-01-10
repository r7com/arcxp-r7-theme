const resolve = query => {
  return `https://cms-coupons-api-qa.ir7.com.br/v1/shops?categories=${query.category}`
}

export default {
  resolve,
  params: {
    category: '',
  },
}
