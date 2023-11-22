const resolve = function resolve(key) {
  const website = key['arc-site']
  const fromQuery = key.from !== '' && key.from !== undefined ? '&from=' + key.from : ''
  const sizeQuery = key.size !== '' && key.size !== undefined ? '&size=' + key.size : ''
  return `/content/v4/collections/?_id=${key._id}&website=${website}${fromQuery}${sizeQuery}`
}

module.exports = {
  resolve,
  schemaName: 'feeds',
  params: { _id: 'text', from: 'text', size: 'text' },
  searchable: 'collection',
}
