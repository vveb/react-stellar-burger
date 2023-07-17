import {
  ADD_BUN,
  ADD_OTHER,
  REMOVE_INGREDIENT,
  RESET_BURGER,
} from '../constants';

export const addBun = (bun) => (
  {
    type: ADD_BUN,
    payload: bun,
  }
);

export const addOther = (ingredient) => (
  {
    type: ADD_OTHER,
    payload: ingredient,
  }
);

export const removeIngredient = (ingredient) => (
  {
    type: REMOVE_INGREDIENT,
    payload: ingredient,
  }
);

export const resetBurger = () => (
  {
    type: RESET_BURGER,
  }
);