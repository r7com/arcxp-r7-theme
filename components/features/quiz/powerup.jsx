/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import get from 'lodash.get'
import Search from './children/search.jsx'
import View from './children/view.jsx'
import Edit from './children/edit.jsx'

const Quiz = () => {
  const [actionID, setActionID] = useState('')

  const getActionParam = () => {
    const actionHash = get(window, 'location.hash', 'NONE')
    setActionID(actionHash.toUpperCase())
  }

  useEffect(() => getActionParam(), [])

  return (
    <div>
      {actionID.includes('#SEARCH') && <Search />}
      {actionID.includes('#VIEW') && <View />}
      {actionID.includes('#EDIT') && <Edit />}
    </div>
  )
}

export default Quiz
