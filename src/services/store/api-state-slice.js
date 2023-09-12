import { createSlice } from "@reduxjs/toolkit";
import { getIngredientsDataThunk } from "./ingredients-slice";
import { getOrderInfoThunk, getOrderNumberThunk } from "./ui-slice";
import {
  loginUserThunk,
  registerNewUserThunk,
  resetPasswordThunk,
  forgotPasswordThunk,
  updateProfileInfoThunk,
  logoutUserThunk
} from "./user-slice";

const initialApiState = {
  isIngredientsRequested: false,
  isIngredientsReceived: false,
  isIngredientsFailed: false,
  isOrderPending: false,
  isOrderPlaced: false,
  isOrderFailed: false,
  isOrderInfoPending: false,
  isOrderInfoSucceed: false,
  isOrderInfoFailed: false,
  isRegistrationPending: false,
  isRegistrationSucceed: false,
  isRegistrationFailed: false,
  isLoginPending: false,
  isLoginSucceed: false,
  isLoginFailed: false,
  isLogoutPending: false,
  isLogoutSucceed: false,
  isLogoutFailed: false,
  isForgotPasswordPending: false,
  isForgotPasswordSucceed: false,
  isForgotPasswordFailed: false,
  isResetPasswordPending: false,
  isResetPasswordSucceed: false,
  isResetPasswordFailed: false,
  isGetProfileInfoPending: false,
  isGetProfileInfoSucceed: false,
  isGetProfileInfoFailed: false,
  isUpdateProfileInfoPending: false,
  isUpdateProfileInfoSucceed: false,
  isUpdateProfileInfoFailed: false,
  isPublicFeedOpen: false,
  isPrivateFeedOpen: false,
  publicFeedRequestedAt: 0, //Можно использовать в качестве индикатора pending открытия
  publicFeedDiscardedAt: 0, //Можно использовать в качестве индикатора pending закрытия
  privateFeedRequestedAt: 0,
  privateFeedDiscardedAt: 0,
  error: null,
};

const apiStateSlice = createSlice({
  name: 'api',
  initialState: initialApiState,
  reducers: {
    setApiError: (state, action) => ({...state, error: action.payload}),
    clearApiError: (state) => ({...state, error: null}),
    setIsGetProfileInfoPending: (state) => ({ ...state, isGetProfileInfoPending: true, isGetProfileInfoSucceed: false, isGetProfileInfoFailed: false, error: null }),
    setIsGetProfileInfoSucceed: (state) => ({ ...state, isGetProfileInfoPending: false, isGetProfileInfoSucceed: true, isGetProfileInfoFailed: false, error: null }),
    setIsGetProfileInfoFailed: (state, action) => ({ ...state, isGetProfileInfoPending: false, isGetProfileInfoSucceed: false, isGetProfileInfoFailed: true, error: action.payload }),
    requestPublicFeed: (state, action) => ({...state, publicFeedRequestedAt: action.payload}),
    discardPublicFeed: (state, action) => ({...state, publicFeedDiscardedAt: action.payload}),
    requestPrivateFeed: (state, action) => ({...state, privateFeedRequestedAt: action.payload}),
    discardPrivateFeed: (state, action) => ({...state, privateFeedDiscardedAt: action.payload}),
    openPublicFeed: (state) => ({...state, isPublicFeedOpen: true, feedRequestedAt: 0}),
    closePublicFeed: (state) => ({...state, isPublicFeedOpen: false, feedDiscardedAt: 0}),
    openPrivateFeed: (state) => ({...state, isPrivateFeedOpen: true, feedRequestedAt: 0}),
    closePrivateFeed: (state) => ({...state, isPrivateFeedOpen: false, feedDiscardedAt: 0}),
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
      return {...state, isOrderPending: false, isOrderInfoPlaced: false, isOrderInfoFailed: true, error: action.payload};
    })
    .addCase(getOrderInfoThunk.pending, (state) => {
      return {...state, isOrderInfoPending: true, isOrderInfoSucceed: false, isOrderInfoFailed: false, error: null};
    })
    .addCase(getOrderInfoThunk.fulfilled, (state) => {
      return {...state, isOrderInfoPending: false, isOrderInfoSucceed: true, isOrderInfoFailed: false, error: null};
    })
    .addCase(getOrderInfoThunk.rejected, (state, action) => {
      return {...state, isOrderInfoPending: false, isOrderInfoSucceed: false, isOrderInfoFailed: true, error: action.payload};
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
    .addCase(logoutUserThunk.pending, (state) => {
      return {...state, isLogoutPending: true, isLogoutSucceed: false, isLogoutFailed: false, error: null};
    })
    .addCase(logoutUserThunk.fulfilled, (state) => {
      return {...state, isLogoutPending: false, isLogoutSucceed: true, isLogoutFailed: false, error: null};
    })
    .addCase(logoutUserThunk.rejected, (state, action) => {
      return {...state, isLogoutPending: false, isLogoutSucceed: false, isLogoutFailed: true, error: action.payload};
    })
    .addCase(forgotPasswordThunk.pending, (state) => {
      return {...state, isForgotPasswordPending: true, isForgotPasswordSucceed: false, isForgotPasswordFailed: false, error: null};
    })
    .addCase(forgotPasswordThunk.fulfilled, (state) => {
      return {...state, isForgotPasswordPending: false, isForgotPasswordSucceed: true, isForgotPasswordFailed: false, error: null};
    })
    .addCase(forgotPasswordThunk.rejected, (state, action) => {
      return {...state, isForgotPasswordPending: false, isForgotPasswordSucceed: false, isForgotPasswordFailed: true, error: action.payload};
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
    .addCase(updateProfileInfoThunk.pending, (state) => {
      return {...state, isUpdateProfileInfoPending: true, isUpdateProfileInfoSucceed: false, isUpdateProfileInfoFailed: false, error: null};
    })
    .addCase(updateProfileInfoThunk.fulfilled, (state) => {
      return {...state, isUpdateProfileInfoPending: false, isUpdateProfileInfoSucceed: true, isUpdateProfileInfoFailed: false, error: null};
    })
    .addCase(updateProfileInfoThunk.rejected, (state, action) => {
      return {...state, isUpdateProfileInfoPending: false, isUpdateProfileInfoSucceed: false, isUpdateProfileInfoFailed: true, error: action.payload};
    })
});

export const {
  setApiError,
  clearApiError,
  setIsGetProfileInfoPending,
  setIsGetProfileInfoSucceed,
  setIsGetProfileInfoFailed,
  requestPublicFeed,
  discardPublicFeed,
  requestPrivateFeed,
  discardPrivateFeed,
  openPublicFeed,
  closePublicFeed,
  openPrivateFeed,
  closePrivateFeed,
} = apiStateSlice.actions;

export default apiStateSlice.reducer;