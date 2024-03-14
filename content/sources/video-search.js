const resolve = function resolve(key) {
  const website = key['arc-site'] || 'r7'
  return `/content/v4/videos/?_id=${key._id}&website=${website}`
}

module.exports = {
  resolve,
  schemaName: 'ans-item',
  params: { _id: 'text', website_url: 'text' },
  searchable: 'video',
}
