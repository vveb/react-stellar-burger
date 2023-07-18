import { combineReducers } from "redux";
import apiStateReducer from "./api-state-reducer";
import currentBurgerReducer from "./current-burger-reducer";
import modalsReducer from "./modals-reducer";
import ingredientsDataReducer from "./ingredients-data-reducer";

const rootReducer = combineReducers({
  api: apiStateReducer,
  currentBurger: currentBurgerReducer,
  modals: modalsReducer,
  ingredientsData: ingredientsDataReducer,
});

export default rootReducer;