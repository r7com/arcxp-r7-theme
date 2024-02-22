export const taboolaDataAttr = name => {
  return (
    name && {
      'data-tb-shadow-region': name,
      'data-tb-region': name,
    }
  )
}
