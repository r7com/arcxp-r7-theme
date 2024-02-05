import React from 'react'
import { useFusionContext } from 'fusion:context'
import { R7Player } from '../../../util/components/Player'
import { getPlayerDataProxy } from '../../../util/components/Player/proxy/proxy'

export default function Player() {
  const { globalContent } = useFusionContext()

  if (!globalContent) return null

  return <R7Player item={getPlayerDataProxy(globalContent)}></R7Player>
}
