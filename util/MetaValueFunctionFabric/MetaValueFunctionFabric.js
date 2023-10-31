export class MetaValueFunctionFabric {
  constructor(baseFunction, interrupts) {
    this.baseFunction = baseFunction
    this.interrupters = interrupts

    this.initInterrupters()
  }

  create() {
    const interrupters = this.interrupters
    const baseFunction = this.baseFunction

    return key => {
      const interrupter = interrupters.find(interrupter => interrupter.shouldInterrupt(key))

      if (!interrupter) {
        return baseFunction(key)
      }

      return interrupter.getValue(key)
    }
  }

  initInterrupters() {
    for (const interrupter of this.interrupters) {
      interrupter.setBaseFunction(this.baseFunction)
    }
  }
}
