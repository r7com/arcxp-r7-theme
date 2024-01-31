import { useState, useEffect } from 'react'
import { useContent } from 'fusion:content'

export const useCustomContent = (listContentConfig, offset) => {
  const [contentElements, setContentElements] = useState([])
  const { content_elements } =
    useContent({
      source: listContentConfig.contentService,
      query: {
        ...{
          ...listContentConfig.contentConfigValues,
          feedOffset: offset,
        },
      },
    }) || {}

  useEffect(() => {
    if (content_elements) {
      setContentElements(prev => [...prev, ...content_elements])
    }
  }, [content_elements])

  return contentElements
}
