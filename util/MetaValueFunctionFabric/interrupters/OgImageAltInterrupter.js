import { BaseMateValueInterrupter } from './BaseInterrupter'

export class OgImageAltInterrupter extends BaseMateValueInterrupter {
  constructor(sectionName) {
    super()

    this.sectionName = sectionName
  }

  shouldInterrupt(key) {
    return ['twitter:image:alt', 'og:image:alt'].includes(key)
  }

  getValue(key) {
    return this.sectionName || this.baseFunction(key)
  }
}
