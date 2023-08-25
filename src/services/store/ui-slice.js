import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/api";

const initialUIState = {
  currentIngredient: null,
  isIngredientDragging: false,
  orderId: null,
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
      return rejectWithValue(`Ошибка при оформлении заказа: ${errorText}`);
    };
  }
);

const UIStateSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload.itemData;
    },
    // ({...state, currentIngredient: action.payload.itemData}),
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    },
    // ({...state, currentIngredient: null}),
    setIsIngredientDragging: (state, action) => {
      state.isIngredientDragging = action.payload.isDrag;
    },
    // ({...state, isIngredientDragging: action.payload.isDrag}),
    clearOrderId: (state) => {
      state.orderId = null;
    },
  },
  extraReducers: (builder) => builder
    .addCase(getOrderNumberThunk.fulfilled, (_, action) => {
      return {...initialUIState, orderId: action.payload};
    }),
});

export {getOrderNumberThunk};
export const {
  setCurrentIngredient,
  clearCurrentIngredient,
  setIsIngredientDragging,
  clearOrderId,
} = UIStateSlice.actions;

export default UIStateSlice.reducer;