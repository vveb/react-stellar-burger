import {
  RESET_CURRENT_INGREDIENT,
  RESET_ORDER_ID,
  SET_CURRENT_INGREDIENT,
  SET_ORDER_ID
} from "../constants";

const initialModalsState = {
  orderId: null,
  currentIngredient: null,
};
const modalsReducer = (state = initialModalsState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return {...state, currentIngredient: action.payload};
    case RESET_CURRENT_INGREDIENT:
      return {...state, currentIngredient: initialModalsState.currentIngredient};
    case SET_ORDER_ID:
      return {...state, orderId: action.payload};
    case RESET_ORDER_ID:
      return {...state, orderId: initialModalsState.orderId};
    default:
      return state;
  };
};
export default modalsReducer;