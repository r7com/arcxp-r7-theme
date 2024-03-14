import React, { useEffect } from 'react'
import { getSectionPropsContent } from '../../get-section-props-content'

const POSITION = 'scrollY'
const DEFAULT_TIME = 240000

export function Refresh() {
  const sectionProps = getSectionPropsContent()
  const refreshTime = sectionProps?.site?.disable_refresh
  const timer = refreshTime ? refreshTime * 60 * 1000 : DEFAULT_TIME

  useEffect(() => {
    if (timer === 0) return

    const scrollTopPosition = localStorage.getItem(POSITION)
    if (scrollTopPosition) {
      setTimeout(() => {
        window.scrollTo({ behavior: 'smooth', left: 0, top: scrollTopPosition })
      }, 350)
      localStorage.removeItem(POSITION)
    }

    setTimeout(() => {
      localStorage.setItem(POSITION, window.scrollY)
      window.location.reload(true)
    }, timer)
  }, [])

  return <></>
}
