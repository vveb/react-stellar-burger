//Возвращает true, если установлен (залогинен) пользователь
export const isLoggedInSelector = (store) => Object.values(store.user).every((item) => !!item);
// export const isOrderPendingSelector = (store) => store.api.isOrderPending;

export const allIngredientsSelector = (store) => store.ingredients.data?.reduce((acc, item) => {
  acc[item._id] = item;
  return acc;
}, {});