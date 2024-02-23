const AGE_RATING_DESCRIPTIONS = {
  atos_criminosos: 'Atos Criminosos',
  conteudo_sexual: 'Conteúdo Sexual',
  drogas: 'Drogas',
  drogas_ilicitas: 'Drogas Ilícitas',
  drogas_licitas: 'Drogas Lícitas',
  linguagem_impropria: 'Linguagem Imprópria',
  medo: 'Medo',
  nudez: 'Nudez',
  procedimentos_medicos: 'Procedimentos Médicos',
  sexo_explicito: 'Sexo Explícito',
  temas_sensiveis: 'Temas Sensíveis',
  violencia: 'Violência',
  violencia_extrema: 'Violência Extrema',
  violencia_fantasiosa: 'Violência Fantasiosa',
}

const AGE_RATING = [
  {
    flag: 'L',
    text: 'Livre',
  },
  {
    flag: '10',
    text: '10 anos',
  },
  {
    flag: '12',
    text: '12 anos',
  },
  {
    flag: '14',
    text: '14 anos',
  },
  {
    flag: '16',
    text: '16 anos',
  },
  {
    flag: '18',
    text: '18 anos',
  },
  {
    flag: 'AL',
    text: 'Autoclassificação livre',
  },
  {
    flag: 'A10',
    text: 'Autoclassificação 10 anos',
  },
  {
    flag: 'A12',
    text: 'Autoclassificação 12 anos',
  },
  {
    flag: 'A14',
    text: 'Autoclassificação 14 anos',
  },
  {
    flag: 'A16',
    text: 'Autoclassificação 16 anos',
  },
  {
    flag: 'A18',
    text: 'Autoclassificação 18 anos',
  },
]

export { AGE_RATING, AGE_RATING_DESCRIPTIONS }
