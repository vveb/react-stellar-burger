import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utils/api";
import { ErrorResponse, Ingredient, Order } from "../types";

export type UIState = {
  currentIngredient: Ingredient | null;
  isIngredientDragging: boolean;
  orderId: number | null;
  isPasswordResetRequested: boolean;
  currentOrderInfo: Order | null;
};

const initialUIState: UIState = {
  currentIngredient: null,
  isIngredientDragging: false,
  orderId: null,
  isPasswordResetRequested: false,
  currentOrderInfo: null,
};

const getOrderNumberThunk = createAsyncThunk(
  'currentBurger/orderNumber',
  async (data, { rejectWithValue }) => {
    try {
      const { order: { number }, success } = await Api.addNewOrder(data.allIngredientsId) ?? {};
      if (!!number && success) {
        return number;
      }
      throw new Error('Неизвестная ошибка');
    } catch(err) {
      const {statusCode, message} = err as unknown as ErrorResponse;
      const errorText = statusCode ? message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при оформлении заказа: ${errorText}`);
    };
  }
);

const getOrderInfoThunk = createAsyncThunk(
  'currentOrder/info',
  async ({ number }, { rejectWithValue }) => {
    try {
      const { success, orders } = await Api.getOrderInfo(number) ?? {};
      if (success && !!orders) {
        const [order] = orders;
        return order;
      }
      throw new Error('Неизвестная ошибка');
    } catch(err) {
      const {statusCode, message} = err as unknown as ErrorResponse;
      const errorText = statusCode ? message : 'Проблема с подключением, проверьте свою сеть';
      return rejectWithValue(`Ошибка при при получении информации о заказе: ${errorText}`);
    }
  }
)

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
    setIsPasswordResetRequested: (state) => {
      state.isPasswordResetRequested = true;
    },
    clearIsPasswordResetRequested: (state) => {
      state.isPasswordResetRequested = false;
    },
    setCurrentOrderInfo: (state, action) => {
      state.currentOrderInfo = action.payload;
    },
    clearCurrentOrderInfo: (state) => {
      state.currentOrderInfo = null;
    }
  },
  extraReducers: (builder) => builder
    .addCase(getOrderNumberThunk.fulfilled, (state, action) => {
      return { ...state, orderId: action.payload };
    })
    .addCase(getOrderInfoThunk.fulfilled, (state, action) => {
      return { ...state, currentOrderInfo: action.payload };
    })
});

export {getOrderNumberThunk, getOrderInfoThunk};
export const {
  setCurrentIngredient,
  clearCurrentIngredient,
  setIsIngredientDragging,
  clearOrderId,
  setIsPasswordResetRequested,
  clearIsPasswordResetRequested,
  setCurrentOrderInfo,
  clearCurrentOrderInfo,
} = UIStateSlice.actions;

// export type UIStateActions = typeof UIStateSlice.actions;

export default UIStateSlice.reducer;