/* eslint-disable no-undef */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const key = 'scrollTopPosition'
@Consumer
class AutomaticPageRefresh extends Component {
  state = {
    timer: this.props.customFields.refreshInterval || 60 * 4,
  }

  componentDidMount() {
    this.setupReloadInterval()
    this.goToOriginalPosition()
    // Define an event handler that sets the `showList` property to the opposite of the `plotShown` value we receive
    const timerHandler = isTimerStarted => {
      isTimerStarted ? this.setupReloadInterval() : clearInterval(this.reloadInterval)
    }

    this.addEventListener('automaticPageRefresh', timerHandler)
  }

  componentWillUnmount() {
    clearInterval(this.reloadInterval)
  }

  goToOriginalPosition = () => {
    const scrollTopPosition = localStorage.getItem(key)
    if (scrollTopPosition) {
      setTimeout(() => {
        window.scrollTo({ behavior: 'smooth', left: 0, top: scrollTopPosition })
      }, 350)
      localStorage.removeItem(key)
    }
  }

  setupReloadInterval = () => {
    // Clear the existing interval if any
    clearInterval(this.reloadInterval)

    // Set up a new interval based on the current reload interval state
    this.reloadInterval = setInterval(() => {
      localStorage.setItem(key, window.scrollY)

      window.location.reload(true)
    }, this.state.timer * 1000)
  }

  render() {
    return <></>
  }
}

AutomaticPageRefresh.label = 'Automatic Page Refresh - R7 Block'

AutomaticPageRefresh.propTypes = {
  customFields: PropTypes.shape({
    refreshInterval: PropTypes.number.tag({
      label: 'Refresh interval in seconds',
      defaultValue: 60 * 4,
    }),
  }),
}

export default AutomaticPageRefresh
