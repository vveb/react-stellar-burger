import { RESET_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../constants";

const currentIngredientInitialState = {
  isSetted: false,
  ingredient: {
    calories: null,
    carbohydrates: null,
    fat: null,
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: null,
    proteins: null,
    type: '',
    __v: null,
    _id: '',
  }
};
const currentIngredientReducer = (state = currentIngredientInitialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        isSetted: true,
        ingredient: {
          ...state.ingredient,
          calories: action.payload.calories,
          carbohydrates: action.payload.carbohydrates,
          fat: action.payload.fat,
          image: action.payload.image,
          image_large: action.payload.image_large,
          image_mobile: action.payload.image_mobile,
          name: action.payload.name,
          price: action.payload.price,
          proteins: action.payload.proteins,
          type: action.payload.type,
          __v: action.payload.__v,
          _id: action.payload._id,
        }
      };
    case RESET_CURRENT_INGREDIENT:
      return currentIngredientInitialState;
    default:
      return state;
  }
}

export default currentIngredientReducer;