import React from 'react'
import { AlertWithImage } from './AlertWithImage'
import { AlertWithoutImage } from './AlertWithoutImage'
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
    'alert-without-image': <AlertWithoutImage hatTitle={hatTitle} />,
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
