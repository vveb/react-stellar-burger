const productTypes = [
  'bun',
  'sauce',
  'main',
]

const baseUrl = 'https://norma.nomoreparties.space/api'
const endpointURLs = {
  ingredients: '/ingredients',
}

const ingredientTypeName = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
}

export {
  productTypes,
  baseUrl,
  endpointURLs,
  ingredientTypeName,
}