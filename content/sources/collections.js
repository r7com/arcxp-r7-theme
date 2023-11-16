const resolve = function resolve(key) {
  const website = key['arc-site']
  const fromQuery = key.from !== '' ? '&from=' + key.from : ''
  return `/content/v4/collections/?_id=${key._id}&website=${website}${fromQuery}`
}

module.exports = {
  resolve,
  schemaName: 'feeds',
  params: { _id: 'text', from: 'text' },
  searchable: 'collection',
}
