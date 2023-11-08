const resolve = function resolve(key) {
  const website = key['arc-site']
  return `/content/v4/?_id=${key._id}&website=${website}`
}

module.exports = {
  resolve,
  schemaName: 'ans-document',
  params: { _id: 'text' },
  searchable: 'video',
}

// ref https://docs.arcxp.com/alc/en/how-to-enable-integrated-story-search-experience-for-pagebuilder-editor?sys_kb_id=3b8f78c347047990eee38788436d43d6&id=kb_article_view&sysparm_rank=8&sysparm_tsqueryId=1ccc878c4712f910eee38788436d43ba
