import { combineReducers } from "redux";
import apiStateReducer from "./api-reducer";
import currentBurgerReducer from "./current-burger-reducer";
import orderDetailsReducer from "./order-details-reducer";

const rootReducer = combineReducers({
  api: apiStateReducer,
  currentBurger: currentBurgerReducer,
  orderDetails: orderDetailsReducer,
});

export default rootReducer;