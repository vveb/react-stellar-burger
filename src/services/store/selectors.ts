import { DictionaryIngredients } from "../types";
import { RootState } from "./store";

//Возвращает true, если установлен (залогинен) пользователь
export const isLoggedInSelector = (store: RootState) => Object.values(store.user).every((item) => !!item);
// export const isOrderPendingSelector = (store) => store.api.isOrderPending;

export const allIngredientsSelector = (store: RootState) => store.ingredients.data?.reduce((acc: DictionaryIngredients, item) => {
  if (acc) {
    acc[item._id] = item;
  }
  return acc;
}, {});