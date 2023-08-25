const productTypes = {
  bun: 'bun',
  sauce: 'sauce',
  main: 'main',
}

const baseUrl = 'https://norma.nomoreparties.space/api'
const endpointURLs = {
  ingredients: '/ingredients',
  orders: '/orders',
  register: '/auth/register',
  refresh: '/auth/token',
  login: '/auth/login',
  updatePassword: '/password-reset',
  resetPassword: '/password-reset/reset',
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