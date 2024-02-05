export function filterBars(fields) {
  const barsCount = 3
  let counter = 1

  const bars = []

  while (counter <= barsCount) {
    const showBar = fields[`showBar${counter}`]

    if (showBar)
      bars.push({
        theme: fields[`theme${counter}`],
        tag: fields[`tag${counter}`].trim(),
        title: fields[`title${counter}`],
        href: fields[`href${counter}`],
        showImage: Boolean(fields[`showImage${counter}`]),
        imageUrl: fields[`imageUrl${counter}`],
        imageAlt: fields[`imageAlt${counter}`],
      })

    counter += 1
  }

  return bars
}
