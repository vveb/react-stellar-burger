import { createSlice } from "@reduxjs/toolkit";
import swapItems from "../../utils/swap-items";
import { getOrderNumberThunk } from "./ui-slice";

const initialCurrentBurgerState = {
  bun: null,
  others: [],
};

const currentBurgerSlice = createSlice({
  name: 'currentBurger',
  initialState: initialCurrentBurgerState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload.bun;
    },
    // ({...state, bun: action.payload}),
    addOther: (state, action) => {
      state.others.push(action.payload.other)
    } /*({...state, others: [...state.others, action.payload]})*/,
    removeIngredient: (state, action) => {
      state.others = state.others.filter((ingredient) => ingredient.uniqueId !== action.payload.itemData.uniqueId);
      // ...state,
      // others: state.others.filter((ingredient) => ingredient.uniqueId != action.payload.itemData.uniqueId),
    },
    changeOrder: (state, action) => {
      const { other, index } = action.payload;
      const oldIndex = state.others.findIndex((item) => item.uniqueId === other.uniqueId);
      const newOthers = swapItems(state.others, oldIndex, index);
      state.others = newOthers;
      // return {...state, others: newOthers};
    },
  },
  //Очистка заказа
  extraReducers: (builder) => builder
    .addCase(getOrderNumberThunk.fulfilled, () => {
      return initialCurrentBurgerState;
    }),
});

export const {
  addBun,
  addOther,
  removeIngredient,
  changeOrder,
} = currentBurgerSlice.actions;

export default currentBurgerSlice.reducer;