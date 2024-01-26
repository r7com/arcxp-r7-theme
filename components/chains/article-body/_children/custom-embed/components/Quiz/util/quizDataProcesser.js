export const quizDataProcesser = data => {
  if (!data) {
    return null
  }
  return {
    id: data._id,
    result_ranges: data.result_ranges,
    showAnswer: data.settings_type.split('::').pop() === 'RightAnswer',
    questions: data.questions,
    published: data.state === 'published',
  }
}
