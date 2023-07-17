import { combineReducers } from "redux";
import apiStateReducer from "./api-reducer";
import currentBurgerReducer from "./current-burger-reducer";

const rootReducer = combineReducers({
  api: apiStateReducer,
  currentBurger: currentBurgerReducer,
});

export default rootReducer;