import { SET_ORDER, RESET_ORDER } from "../constants";

const orderDetailsInitialState = {
  name: '',
  order: {
    number: null,
  },
  success: false,
};
const orderDetailsReducer = (state = orderDetailsInitialState, action) => {
  switch(action.type) {
    case SET_ORDER:
      return {
        ...state,
        name: action.payload.name,
        order: {
          ...state.order,
          number: action.payload.order.number,
        },
        success: action.payload.success,
      };
    case RESET_ORDER:
      return orderDetailsInitialState;
    default:
      return state;
  }
}

export default orderDetailsReducer;