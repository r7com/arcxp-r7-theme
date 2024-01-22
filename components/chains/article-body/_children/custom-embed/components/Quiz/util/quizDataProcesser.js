export const quizDataProcesser = () => {
  const mockData = {
    id: 'a1',
    title: 'Fã de Carterinha',
    questions: [
      {
        id: 'a1-1',
        question: 'Mock for first question',
        image_url: '/',
        image_title: 'Mock title',
        image_descr: 'Mock descr',
        answer: {
          option_id: 'a1-1-1',
          title: 'Muito bom você acertou!',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur diam molestie, dictum dui vel, bibendum velit. Phasellus',
        },
        options: [
          { id: 'a1-1-1', text: 'Mock answer text' },
          { id: 'a1-1-2', text: 'Mock answer text' },
          { id: 'a1-1-3', text: 'Mock answer text' },
        ],
      },
      {
        id: 'a1-2',
        question: 'Mock for second question',
        image_url: '/',
        image_title: 'Mock title',
        image_descr: 'Mock descr',
        answer: {
          option_id: 'a1-2-1',
          title: 'Muito bom você acertou!',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur diam molestie, dictum dui vel, bibendum velit. Phasellus',
        },
        options: [
          { id: 'a1-2-1', text: 'Mock answer text' },
          { id: 'a1-2-2', text: 'Mock answer text' },
          { id: 'a1-2-3', text: 'Mock answer text' },
        ],
      },
      {
        id: 'a1-3',
        question: 'Mock for third question',
        image_url: '/',
        image_title: 'Mock title',
        image_descr: 'Mock descr',
        answer: {
          option_id: 'a1-3-1',
          title: 'Muito bom você acertou!',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur diam molestie, dictum dui vel, bibendum velit. Phasellus',
        },
        options: [
          { id: 'a1-3-1', text: 'Mock answer text' },
          { id: 'a1-3-2', text: 'Mock answer text' },
          { id: 'a1-3-3', text: 'Mock answer text' },
        ],
      },
    ],
  }
  return {
    id: mockData.quizId,
    title: mockData.title,
    questions: mockData.questions,
  }
}
