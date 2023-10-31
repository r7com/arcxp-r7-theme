import { BaseMateValueInterrupter } from './BaseInterrupter'

export class OgImageInterrupter extends BaseMateValueInterrupter {
  constructor(imageUrl) {
    super()

    this.imageUrl = imageUrl
  }

  shouldInterrupt(key) {
    return ['twitter:image', 'og:image'].includes(key)
  }

  getValue(key) {
    return this.imageUrl || this.baseFunction(key)
  }
}
