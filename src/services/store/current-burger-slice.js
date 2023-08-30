import { createSlice } from "@reduxjs/toolkit";
import swapItems from "../../utils/swap-items";
import { getOrderNumberThunk } from "./ui-slice";
import { nanoid } from "nanoid";

const initialCurrentBurgerState = {
  bun: null,
  others: [],
};

const currentBurgerSlice = createSlice({
  name: 'currentBurger',
  initialState: initialCurrentBurgerState,
  reducers: {
    addBun: {
      reducer: (state, action) => {
        state.bun = action.payload;
        // ({...state, bun: action.payload}),
      },
      prepare: (itemData) => {
        const uniqueId = nanoid(8);
        return { payload: { ...itemData, uniqueId } };
      }
    },
    addOther: {
      reducer: (state, action) => {
        state.others.push(action.payload);
        /*({...state, others: [...state.others, action.payload]})*/
      },
      prepare: (itemData) => {
        const uniqueId = nanoid(8);
        return { payload: { ...itemData, uniqueId } };
      },
    },
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