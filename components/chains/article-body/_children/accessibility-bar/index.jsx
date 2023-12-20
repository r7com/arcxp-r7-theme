import React from 'react'
import '@r7/ui-article-delivery/style.css'
import {
  AccessibilityBar,
  ContrastControl,
  FontSizeControlDecrease,
  FontSizeControlIncrease,
} from '@r7/ui-article-delivery'

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
          <FontSizeControlIncrease />
        </AccessibilityBar.Item>
        <AccessibilityBar.Item>
          <FontSizeControlDecrease />
        </AccessibilityBar.Item>
      </AccessibilityBar.List>
    </AccessibilityBar>
  )
}

export default Accessibility
