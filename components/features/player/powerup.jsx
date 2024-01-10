/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import get from 'lodash.get'
import Search from './children/search.jsx'
import View from './children/view.jsx'
import Edit from './children/edit.jsx'

//This component is the Block that is added to a page
//and it controls which frame to display based on the URL
const EmbedPlayer = () => {
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

export default EmbedPlayer
