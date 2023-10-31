export class BaseMateValueInterrupter {
  shouldInterrupt() {
    throw new Error('shouldInterrupt  is abstract method. Should be implemented in child')
  }

  getValue() {
    throw new Error('shouldInterrupt  is abstract method. Should be implemented in child')
  }

  setBaseFunction(baseFunction) {
    this.baseFunction = baseFunction
  }
}
