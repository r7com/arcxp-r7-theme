const resolve = function resolve(key) {
  const website = key['arc-site'] || 'r7'
  return `/content/v4/galleries/?_id=${key._id}&website=${website}`
}

module.exports = {
  resolve,
  schemaName: 'ans-item',
  params: { _id: 'text', website_url: 'text' },
  searchable: 'gallery',
}
