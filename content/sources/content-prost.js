import axios from 'axios'

const params = [
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
const fetch = ({ 'arc-site': website, website_url: websiteUrl }) => {
  const searchParams = new URLSearchParams({
    path: websiteUrl,
    host: website === 'r7' ? `${website}.com` : `${website}.r7.com`,
  })
  return axios({
    url: `http://prost-delivery.ir7.com.br/api/resource/published_version?${searchParams.toString()}`,
    headers: {
      'content-type': 'application/json',
      'X-R7-APIKEY': 'fb8e85c99b703daf9d1865b0436decc4',
    },
    method: 'GET',
  }).then(({ data }) => {
    return data
  })
}

export default {
  fetch,
  params,
}
