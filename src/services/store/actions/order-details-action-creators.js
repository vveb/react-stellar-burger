import { SET_ORDER, RESET_ORDER } from "../constants";

export const setOrderDetails = (orderDetails) => (
  {
    type: SET_ORDER,
    payload: orderDetails,
  }
);

export const resetOrderDetails = () => (
  {
    type: RESET_ORDER,
  }
);