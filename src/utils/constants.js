const productTypes = {
  bun: 'bun',
  sauce: 'sauce',
  main: 'main',
}

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

export const SET_API_ERROR = 'API/SET_ERROR';
export const CLEAR_API_ERROR = 'API/CLEAR_ERROR';
export const INGREDIENTS_REQUESTED = 'API/INGREDIENTS_REQUESTED';
export const INGREDIENTS_RECIEVED = 'API/INGREDIENTS_RECIEVED';
export const INGREDIENTS_FAILED = 'API/INGREDIENTS_FAILED';
export const ORDER_PENDING = 'API/ORDER_PENDING';
export const ORDER_PLACED = 'API/ORDER_PLACED';
export const ORDER_FAILED = 'API/ORDER_FAILED';

export {
  productTypes,
  baseUrl,
  endpointURLs,
  ingredientTypeName,
}