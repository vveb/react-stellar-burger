//Возвращает true, если установлен (залогинен) пользователь
export const isLoggedInSelector = (store) => Object.values(store.user).every((item) => !!item);
// export const isOrderPendingSelector = (store) => store.api.isOrderPending;