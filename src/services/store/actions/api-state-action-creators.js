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

export const setApiError = (errorText) => (
  {
    type: SET_API_ERROR,
    payload: errorText,
  }
);

export const resetApiError = () => (
  {
    type: CLEAR_API_ERROR,
  }
);

export const ingredientsRequested = () => (
  {
    type: INGREDIENTS_REQUESTED,
  }
)

export const ingredientsReceived = (ingredientsData) => (
  {
    type: INGREDIENTS_RECEIVED,
    payload: ingredientsData,
  }
);

export const ingredientsFailed = (errorText) => (
  {
    type: INGREDIENTS_FAILED,
    payload: errorText,
  }
);

export const orderPending = () => (
  {
    type: ORDER_PENDING,
  }
)

export const orderPlaced = () => (
  {
    type: ORDER_PLACED,
  }
)

export const orderFailed = (errorText) => (
  {
    type: ORDER_FAILED,
    payload: errorText,
  }
)