import { INGREDIENTS_FAILED, INGREDIENTS_RECIEVED, INGREDIENTS_REQUESTED } from "../constants";

const initialIngredientsData = {success: false, data: null};
const ingredientsDataReducer = (state = initialIngredientsData, action) => {
  switch (action.type) {
    case INGREDIENTS_RECIEVED:
      return {success: action.payload.success, data: action.payload.data};
    case INGREDIENTS_FAILED:
      return initialIngredientsData;
    case INGREDIENTS_REQUESTED:
      return initialIngredientsData;
    default:
      return state;
  };
};

export default ingredientsDataReducer;