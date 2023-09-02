const productTypes = {
  bun: 'bun',
  sauce: 'sauce',
  main: 'main',
};

const baseUrl = 'https://norma.nomoreparties.space/api'
const endpointURLs = {
  ingredients: '/ingredients',
  orders: '/orders',
  register: '/auth/register',
  refresh: '/auth/token',
  login: '/auth/login',
  logout: '/auth/logout',
  forgotPassword: '/password-reset',
  resetPassword: '/password-reset/reset',
  profileInfo: '/auth/user',
};

const ingredientTypeName = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};

const orderStatus = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится',
  canceled: 'Отменен',
}

export {
  productTypes,
  baseUrl,
  endpointURLs,
  ingredientTypeName,
  orderStatus,
}