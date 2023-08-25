import { configureStore } from "@reduxjs/toolkit";
import apiReducer from './api-state-slice';
import ingredientsReducer from './ingredients-slice';
import currentBurgerReducer from "./current-burger-slice";
import uiReducer from './ui-slice';
import userReducer from './user-slice';

const store = configureStore({
  reducer: {
    api: apiReducer,
    ingredients: ingredientsReducer,
    currentBurger: currentBurgerReducer,
    ui: uiReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

