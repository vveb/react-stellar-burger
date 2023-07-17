import { SET_API_ERROR, CLEAR_API_ERROR, INGREDIENTS_FAILED, INGREDIENTS_RECIEVED, ORDER_PENDING, ORDER_PLACED, ORDER_FAILED, INGREDIENTS_REQUESTED } from './constants'

export const setApiError = (errorText) => (
  {
    type: SET_API_ERROR,
    payload: errorText,
  }
);

export const ingredientsRequested = () => (
  {
    type: INGREDIENTS_REQUESTED,
  }
)

export const ingredientsRecieved = () => (
  {
    type: INGREDIENTS_RECIEVED,
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

export const resetApiError = () => (
  {
    type: CLEAR_API_ERROR,
  }
);