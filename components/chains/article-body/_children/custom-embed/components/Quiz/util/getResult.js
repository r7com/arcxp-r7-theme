export const getResult = (selectedAnswers, resultRanges) => {
  const correctAnswersAmount = Object.values(selectedAnswers).filter(value => value.correct).length
  return resultRanges.find(
    range => range.from <= correctAnswersAmount && range.to >= correctAnswersAmount,
  )
}
