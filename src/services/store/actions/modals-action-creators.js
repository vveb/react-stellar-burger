import {
  RESET_CURRENT_INGREDIENT,
  RESET_ORDER_ID,
  SET_CURRENT_INGREDIENT,
  SET_ORDER_ID
} from "../constants";

export const setCurrentIngredient = (ingredient) => (
  {
    type: SET_CURRENT_INGREDIENT,
    payload: ingredient,
  }
);

export const resetCurrentIngredient = () => (
  {
    type: RESET_CURRENT_INGREDIENT,
  }
);

export const setOrderId = (id) => (
  {
    type: SET_ORDER_ID,
    payload: id,
  }
)

export const resetOrderId = () => (
  {
    type: RESET_ORDER_ID,
  }
)