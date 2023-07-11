const productTypes = [
  'bun',
  'sauce',
  'main',
]

const baseUrl = 'https://norma.nomoreparties.space/api'
const endpointURLs = {
  ingredients: '/ingredients',
  orders: '/orders',
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