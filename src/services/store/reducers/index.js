import { combineReducers } from "redux";
import apiStateReducer from "./api-reducer";
import currentBurgerReducer from "./current-burger-reducer";
import orderDetailsReducer from "./order-details-reducer";
import currentIngredientReducer from "./current-ingredient-reducer";

const rootReducer = combineReducers({
  api: apiStateReducer,
  currentBurger: currentBurgerReducer,
  orderDetails: orderDetailsReducer,
  currentIngredient: currentIngredientReducer,
});

export default rootReducer;