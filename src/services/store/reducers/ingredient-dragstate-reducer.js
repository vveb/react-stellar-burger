import { SET_IS_DRAGGING_INGREDIENT } from "../constants";

const initialIngredientDragstate = false;

const ingredientDragstateReducer = (state = initialIngredientDragstate, action) => {
  switch (action.type) {
    case SET_IS_DRAGGING_INGREDIENT:
      return action.payload;
    default:
      return state;
  };
};

export default ingredientDragstateReducer;