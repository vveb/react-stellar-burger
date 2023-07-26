import { SET_IS_DRAGGING_INGREDIENT } from "../constants";

export const setIsDraggingIngredient = (value) => (
  {
    type: SET_IS_DRAGGING_INGREDIENT,
    payload: value,
  }
)