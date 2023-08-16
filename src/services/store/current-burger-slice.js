import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/api";
import swapItems from "../../utils/swap-items";

const initialCurrentBurgerState = {
  bun: null,
  others: [],
  orderId: null, // TODO: Перенести это в UI
};

const getOrderNumberThunk = createAsyncThunk(
  'currentBurger/orderNumber',
  async (data, { rejectWithValue }) => {
    try {
      const { order: { number }, success } = await Api.addNewOrder(data.allIngredientsId) ?? {};
      if (!!number && success) {
        return number;
      }
      throw new Error({statusCode: 500, message: 'Неизвестная ошибка'});
    } catch(err) {
      const errorText = err.statusCode ? err.message : 'Проблема с подключением, проверьте свою сеть';
      rejectWithValue(`Ошибка при оформлении заказа: ${errorText}`);
    };
  }
);

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
      state.others = state.others.filter((ingredient) => ingredient.uniqueId != action.payload.itemData.uniqueId);
      // ...state,
      // others: state.others.filter((ingredient) => ingredient.uniqueId != action.payload.itemData.uniqueId),
    },
    // resetBurger: (state) => ({...state.orderId, ...initialCurrentBurgerState}),
    changeOrder: (state, action) => {
      const { other, index } = action.payload;
      const oldIndex = state.others.findIndex((item) => item.uniqueId === other.uniqueId);
      const newOthers = swapItems(state.others, oldIndex, index);
      state.others = newOthers;
      // return {...state, others: newOthers};
    },
    clearOrderId: (state) => {
      state.orderId = null;
    },
  },
  extraReducers: (builder) => builder
    .addCase(getOrderNumberThunk.fulfilled, (_, action) => {
      return {...initialCurrentBurgerState, orderId: action.payload};
    })
});

export {getOrderNumberThunk};
export const {
  addBun,
  addOther,
  removeIngredient,
  resetBurger,
  changeOrder,
  clearOrderId,
} = currentBurgerSlice.actions;

export default currentBurgerSlice.reducer;