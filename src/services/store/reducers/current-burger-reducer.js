import swapItems from "../../../utils/swap-items";
import { ADD_BUN, ADD_OTHER, REMOVE_INGREDIENT, RESET_BURGER, CHANGE_ORDER } from "../constants";

const currentBurgerInitialState = {bun: null, others: []};
const currentBurgerReducer = (state = currentBurgerInitialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return { ...state, bun: action.payload };
    case ADD_OTHER:
      return { ...state, others: [...state.others, action.payload] };
    case REMOVE_INGREDIENT:
      return {...state, others: state.others.filter((ingredient) => ingredient.uniqueId !== action.payload.uniqueId)};
    case RESET_BURGER:
      return currentBurgerInitialState;
    case CHANGE_ORDER: {
      const { other, index } = action.payload;
      const oldIndex = state.others.findIndex((item) => item.uniqueId === other.uniqueId);
      const newOthers = swapItems(state.others, oldIndex, index);
      return {...state, others: newOthers};
    }
    default:
      return state;
  }
}

export default currentBurgerReducer;