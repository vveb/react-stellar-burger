import { createSlice } from "@reduxjs/toolkit";
import { getIngredientsDataThunk } from "./ingredients-slice";
import { getOrderNumberThunk } from "./ui-slice";
import { loginUserThunk, registerNewUserThunk, resetPasswordThunk, updatePasswordThunk } from "./user-slice";

const initialApiState = {
  isIngredientsRequested: false,
  isIngredientsReceived: false,
  isIngredientsFailed: false,
  isOrderPending: false,
  isOrderPlaced: false,
  isOrderFailed: false,
  isRegistrationPending: false,
  isRegistrationSucceed: false,
  isRegistrationFailed: false,
  isLoginPending: false,
  isLoginSucceed: false,
  isLoginFailed: false,
  isUpdatePasswordPending: false,
  isUpdatePasswordSucceed: false,
  isUpdatePasswordFailed: false,
  isResetPasswordPending: false,
  isResetPasswordSucceed: false,
  isResetPasswordFailed: false,
  error: null,
};

const apiStateSlice = createSlice({
  name: 'api',
  initialState: initialApiState,
  reducers: {
    setApiError: (state, action) => ({...state, error: action.payload}),
    clearApiError: (state) => ({...state, error: null}),
  },
  extraReducers: (builder) => builder
    .addCase(getIngredientsDataThunk.pending, (state) => {
      return {...state, isIngredientsRequested: true, isIngredientsReceived: false, isIngredientsFailed: false, error: null};
    })
    .addCase(getIngredientsDataThunk.fulfilled, (state) => {
      return {...state, isIngredientsRequested: false, isIngredientsReceived: true, isIngredientsFailed: false, error: null};
    })
    .addCase(getIngredientsDataThunk.rejected, (state, action) => {
      return {...state, isIngredientsRequested: false, isIngredientsReceived: false, isIngredientsFailed: true, error: action.payload};
    })
    .addCase(getOrderNumberThunk.pending, (state) => {
      return {...state, isOrderPending: true, isOrderPlaced: false, isOrderFailed: false, error: null};
    })
    .addCase(getOrderNumberThunk.fulfilled, (state) => {
      return {...state, isOrderPending: false, isOrderPlaced: true, isOrderFailed: false, error: null};
    })
    .addCase(getOrderNumberThunk.rejected, (state, action) => {
      return {...state, isOrderPending: false, isOrderPlaced: false, isOrderFailed: true, error: action.payload};
    })
    .addCase(registerNewUserThunk.pending, (state) => {
      return {...state, isRegistrationPending: true, isRegistrationSucceed: false, isRegistrationFailed: false, error: null};
    })
    .addCase(registerNewUserThunk.fulfilled, (state) => {
      return {...state, isRegistrationPending: false, isRegistrationSucceed: true, isRegistrationFailed: false, error: null};
    })
    .addCase(registerNewUserThunk.rejected, (state, action) => {
      return {...state, isRegistrationPending: false, isRegistrationSucceed: false, isRegistrationFailed: true, error: action.payload};
    })
    .addCase(loginUserThunk.pending, (state) => {
      return {...state, isLoginPending: true, isLoginSucceed: false, isLoginFailed: false, error: null};
    })
    .addCase(loginUserThunk.fulfilled, (state) => {
      return {...state, isLoginPending: false, isLoginSucceed: true, isLoginFailed: false, error: null};
    })
    .addCase(loginUserThunk.rejected, (state, action) => {
      return {...state, isLoginPending: false, isLoginSucceed: false, isLoginFailed: true, error: action.payload};
    })
    .addCase(updatePasswordThunk.pending, (state) => {
      return {...state, isUpdatePasswordPending: true, isUpdatePasswordSucceed: false, isUpdatePasswordFailed: false, error: null};
    })
    .addCase(updatePasswordThunk.fulfilled, (state) => {
      return {...state, isUpdatePasswordPending: false, isUpdatePasswordSucceed: true, isUpdatePasswordFailed: false, error: null};
    })
    .addCase(updatePasswordThunk.rejected, (state, action) => {
      return {...state, isUpdatePasswordPending: false, isUpdatePasswordSucceed: false, isUpdatePasswordFailed: true, error: action.payload};
    })
    .addCase(resetPasswordThunk.pending, (state) => {
      return {...state, isResetPasswordPending: true, isResetPasswordSucceed: false, isResetPasswordFailed: false, error: null};
    })
    .addCase(resetPasswordThunk.fulfilled, (state) => {
      return {...state, isResetPasswordPending: false, isResetPasswordSucceed: true, isResetPasswordFailed: false, error: null};
    })
    .addCase(resetPasswordThunk.rejected, (state, action) => {
      return {...state, isResetPasswordPending: false, isResetPasswordSucceed: false, isResetPasswordFailed: true, error: action.payload};
    })
    //TODO: Добавить для getProfileInfo и updateProfileInfo
});

export const { setApiError, clearApiError } = apiStateSlice.actions;
export default apiStateSlice.reducer;