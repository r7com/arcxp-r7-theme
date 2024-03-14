export function getItemsWithCustomFields(items, labels) {
  return items?.map((item, index) => ({ ...item, label: { ...labels[index] } }))
}
