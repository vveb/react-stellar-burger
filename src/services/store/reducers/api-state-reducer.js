import { 
  SET_API_ERROR,
  CLEAR_API_ERROR,
  INGREDIENTS_REQUESTED,
  INGREDIENTS_RECEIVED,
  INGREDIENTS_FAILED,
  ORDER_PENDING,
  ORDER_PLACED,
  ORDER_FAILED,
 } from '../constants';

const initialApiState = {
  isIngredientsRequested: false,
  isIngredientsReceived: false,
  isIngredientsFailed: false,
  isOrderPending: false,
  isOrderPlaced: false,
  isOrderFailed: false,
  error: null,
}

const apiStateReducer = (state = initialApiState, action) => {
  switch(action.type) {
    case SET_API_ERROR:
      return {...state, error: action.payload};
    case CLEAR_API_ERROR:
      return {...state, error: null};
    case INGREDIENTS_REQUESTED:
      return {...state, isIngredientsRequested: true, isIngredientsReceived: false, isIngredientsFailed: false, error: null};
    case INGREDIENTS_RECEIVED:
      return {...state, isIngredientsRequested: false, isIngredientsReceived: true, isIngredientsFailed: false, error: null};
    case INGREDIENTS_FAILED:
      return {...state, isIngredientsRequested: false, isIngredientsReceived: false, isIngredientsFailed: true, error: action.payload};
    case ORDER_PENDING:
      return {...state, isOrderPending: true, isOrderPlaced: false, isOrderFailed: false, error: null};
    case ORDER_PLACED:
      return {...state, isOrderPending: false, isOrderPlaced: true, isOrderFailed: false, error: null};
    case ORDER_FAILED:
      return {...state, isOrderPending: false, isOrderPlaced: false, isOrderFailed: true, error: action.payload};
    default:
      return state;
  };
};

export default apiStateReducer;