import { RESET_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../constants";

export const setCurrentIngredient = (ingredientData) => (
  {
    type: SET_CURRENT_INGREDIENT,
    payload: ingredientData,
  }
);

export const resetCurrentIngredient = () => (
  {
    type: RESET_CURRENT_INGREDIENT,
  }
)