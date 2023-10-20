import React from 'react'
import { AlertWithImage } from './AlertWithImage'
import { BreakingNews } from './BreakingNews'
import { WithImage } from './WithImage'
import { WithoutImage } from './WithoutImage'

export function Hat({ type = 'without-image', hatTitle, hatImage, hatImageDescription, color }) {
  return {
    'alert-with-image': (
      <AlertWithImage
        hatImage={hatImage}
        hatImageDescription={hatImageDescription}
        hatTitle={hatTitle}
      />
    ),
    'breaking-news': <BreakingNews hatTitle={hatTitle} />,
    'with-image': (
      <WithImage
        hatImage={hatImage}
        hatImageDescription={hatImageDescription}
        hatTitle={hatTitle}
        color={color}
      />
    ),
    'without-image': <WithoutImage color={color} hatTitle={hatTitle} />,
  }[type]
}
