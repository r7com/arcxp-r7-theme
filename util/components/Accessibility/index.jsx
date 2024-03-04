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
