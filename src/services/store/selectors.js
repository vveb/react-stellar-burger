//Dозвращает true, если установлен (залогинен) пользователь
export const isLoggedInSelector = (store) => Object.values(store.user).every((item) => !!item);