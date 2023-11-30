import React from 'react'
import '@r7/ui-article-delivery/style.css'
import { AccessibilityBar, ContrastControl, FontSizeControl } from '@r7/ui-article-delivery'

export const Accessibility = () => {
  return (
    <AccessibilityBar>
      <div id="audimaWidget"></div>
      <script src="https://audio8.audima.co/audima-widget.js" async></script>
      <AccessibilityBar.List>
        <AccessibilityBar.Item>
          <ContrastControl />
        </AccessibilityBar.Item>
        <AccessibilityBar.Item>
          <FontSizeControl.Increase />
        </AccessibilityBar.Item>
        <AccessibilityBar.Item>
          <FontSizeControl.Decrease />
        </AccessibilityBar.Item>
      </AccessibilityBar.List>
    </AccessibilityBar>
  )
}

export default Accessibility
