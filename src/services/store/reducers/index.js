import { combineReducers } from "redux";
import apiStateReducer from "./api-reducer";
import currentBurgerReducer from "./current-burger-reducer";
import modalsReducer from "./modals-reducer";

const rootReducer = combineReducers({
  api: apiStateReducer,
  currentBurger: currentBurgerReducer,
  modals: modalsReducer,
});

export default rootReducer;