import { combineReducers } from "redux";
import apiStateReducer from "./api-state-reducer";
import currentBurgerReducer from "./current-burger-reducer";
import modalsReducer from "./modals-reducer";
import ingredientsDataReducer from "./ingredients-data-reducer";
import ingredientDragstateReducer from "./ingredient-dragstate-reducer";

const rootReducer = combineReducers({
  api: apiStateReducer,
  currentBurger: currentBurgerReducer,
  modals: modalsReducer,
  ingredientsData: ingredientsDataReducer,
  isIngredientDraggingNow: ingredientDragstateReducer,
});

export default rootReducer;