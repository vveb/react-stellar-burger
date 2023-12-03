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

type ApiState = {
  isIngredientsRequested: boolean;
  isIngredientsReceived: boolean;
  isIngredientsFailed: boolean;
  isOrderPending: boolean;
  isOrderPlaced: boolean;
  isOrderFailed: boolean;
  isOrderInfoPending: boolean;
  isOrderInfoSucceed: boolean;
  isOrderInfoFailed: boolean;
  isRegistrationPending: boolean;
  isRegistrationSucceed: boolean;
  isRegistrationFailed: boolean;
  isLoginPending: boolean;
  isLoginSucceed: boolean;
  isLoginFailed: boolean;
  isLogoutPending: boolean;
  isLogoutSucceed: boolean;
  isLogoutFailed: boolean;
  isForgotPasswordPending: boolean;
  isForgotPasswordSucceed: boolean;
  isForgotPasswordFailed: boolean;
  isResetPasswordPending: boolean;
  isResetPasswordSucceed: boolean;
  isResetPasswordFailed: boolean;
  isGetProfileInfoPending: boolean;
  isGetProfileInfoSucceed: boolean;
  isGetProfileInfoFailed: boolean;
  isUpdateProfileInfoPending: boolean;
  isUpdateProfileInfoSucceed: boolean;
  isUpdateProfileInfoFailed: boolean;
  isPublicFeedOpen: boolean;
  isPrivateFeedOpen: boolean;
  publicFeedRequestedAt: number;
  publicFeedDiscardedAt: number;
  privateFeedRequestedAt: number;
  privateFeedDiscardedAt: number;
  error?: string | null | unknown, //QUESTION: не знаю, правильный ли это тип
}

const initialApiState: ApiState = {
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
      state.isIngredientsRequested = true;
      state.isIngredientsReceived = false;
      state.isIngredientsFailed = false;
      state.error = null;
    })
    .addCase(getIngredientsDataThunk.fulfilled, (state) => {
      state.isIngredientsRequested = false;
      state.isIngredientsReceived = true;
      state.isIngredientsFailed = false;
      state.error = null;
    })
    .addCase(getIngredientsDataThunk.rejected, (state, action) => {
      state.isIngredientsRequested = false;
      state.isIngredientsReceived = false;
      state.isIngredientsFailed = true;
      state.error = action.payload;
    })
    .addCase(getOrderNumberThunk.pending, (state) => {
      state.isOrderPending = true;
      state.isOrderPlaced = false;
      state.isOrderFailed = false;
      state.error = null;
    })
    .addCase(getOrderNumberThunk.fulfilled, (state) => {
      state.isOrderPending = false;
      state.isOrderPlaced = true;
      state.isOrderFailed = false;
      state.error = null;
      // return {...state, isOrderPending: false, isOrderPlaced: true, isOrderFailed: false, error: null};
    })
    .addCase(getOrderNumberThunk.rejected, (state, action) => {
      state.isOrderPending = false;
      state.isOrderPlaced = false;
      state.isOrderFailed = true;
      state.error = action.payload;
      // return {...state, isOrderPending: false, isOrderInfoPlaced: false, isOrderInfoFailed: true, error: action.payload};
    })
    .addCase(getOrderInfoThunk.pending, (state) => {
      state.isOrderInfoPending = true;
      state.isOrderInfoSucceed = false;
      state.isOrderInfoFailed = false;
      state.error = null;
      // return {...state, isOrderInfoPending: true, isOrderInfoSucceed: false, isOrderInfoFailed: false, error: null};
    })
    .addCase(getOrderInfoThunk.fulfilled, (state) => {
      state.isOrderInfoPending = false;
      state.isOrderInfoSucceed = true;
      state.isOrderInfoFailed = false;
      state.error = null;
      // return {...state, isOrderInfoPending: false, isOrderInfoSucceed: true, isOrderInfoFailed: false, error: null};
    })
    .addCase(getOrderInfoThunk.rejected, (state, action) => {
      state.isOrderInfoPending = false;
      state.isOrderInfoSucceed = false;
      state.isOrderInfoFailed = true;
      state.error = action.payload;
      // return {...state, isOrderInfoPending: false, isOrderInfoSucceed: false, isOrderInfoFailed: true, error: action.payload};
    })
    .addCase(registerNewUserThunk.pending, (state) => {
      state.isRegistrationPending = true;
      state.isRegistrationSucceed = false;
      state.isRegistrationFailed = false;
      state.error = null;
      // return {...state, isRegistrationPending: true, isRegistrationSucceed: false, isRegistrationFailed: false, error: null};
    })
    .addCase(registerNewUserThunk.fulfilled, (state) => {
      state.isRegistrationPending = false;
      state.isRegistrationSucceed = true;
      state.isRegistrationFailed = false;
      state.error = null;
      // return {...state, isRegistrationPending: false, isRegistrationSucceed: true, isRegistrationFailed: false, error: null};
    })
    .addCase(registerNewUserThunk.rejected, (state, action) => {
      state.isRegistrationPending = false;
      state.isRegistrationSucceed = false;
      state.isRegistrationFailed = true;
      state.error = action.payload;
      // return {...state, isRegistrationPending: false, isRegistrationSucceed: false, isRegistrationFailed: true, error: action.payload};
    })
    .addCase(loginUserThunk.pending, (state) => {
      state.isLoginPending = true;
      state.isLoginSucceed = false;
      state.isLoginFailed = false;
      state.error = null;
      // return {...state, isLoginPending: true, isLoginSucceed: false, isLoginFailed: false, error: null};
    })
    .addCase(loginUserThunk.fulfilled, (state) => {
      state.isLoginPending = false;
      state.isLoginSucceed = true;
      state.isLoginFailed = false;
      state.error = null;
      // return {...state, isLoginPending: false, isLoginSucceed: true, isLoginFailed: false, error: null};
    })
    .addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoginPending = false;
      state.isLoginSucceed = false;
      state.isLoginFailed = true;
      state.error = action.payload;
      // return {...state, isLoginPending: false, isLoginSucceed: false, isLoginFailed: true, error: action.payload};
    })
    .addCase(logoutUserThunk.pending, (state) => {
      state.isLogoutPending = true;
      state.isLogoutSucceed = false;
      state.isLogoutFailed = false;
      state.error = null;
      // return {...state, isLogoutPending: true, isLogoutSucceed: false, isLogoutFailed: false, error: null};
    })
    .addCase(logoutUserThunk.fulfilled, (state) => {
      state.isLogoutPending = false;
      state.isLogoutSucceed = true;
      state.isLogoutFailed = false;
      state.error = null;
      // return {...state, isLogoutPending: false, isLogoutSucceed: true, isLogoutFailed: false, error: null};
    })
    .addCase(logoutUserThunk.rejected, (state, action) => {
      state.isLogoutPending = false;
      state.isLogoutSucceed = false;
      state.isLogoutFailed = true;
      state.error = action.payload;
      // return {...state, isLogoutPending: false, isLogoutSucceed: false, isLogoutFailed: true, error: action.payload};
    })
    .addCase(forgotPasswordThunk.pending, (state) => {
      state.isForgotPasswordPending = true;
      state.isForgotPasswordSucceed = false;
      state.isForgotPasswordFailed = false;
      state.error = null;
      // return {...state, isForgotPasswordPending: true, isForgotPasswordSucceed: false, isForgotPasswordFailed: false, error: null};
    })
    .addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.isForgotPasswordPending = true;
      state.isForgotPasswordSucceed = false;
      state.isForgotPasswordFailed = false;
      state.error = null;
      // return {...state, isForgotPasswordPending: false, isForgotPasswordSucceed: true, isForgotPasswordFailed: false, error: null};
    })
    .addCase(forgotPasswordThunk.rejected, (state, action) => {
      state.isForgotPasswordPending = false;
      state.isForgotPasswordSucceed = false;
      state.isForgotPasswordFailed = true;
      state.error = action.payload;
      // return {...state, isForgotPasswordPending: false, isForgotPasswordSucceed: false, isForgotPasswordFailed: true, error: action.payload};
    })
    .addCase(resetPasswordThunk.pending, (state) => {
      state.isResetPasswordPending = true;
      state.isResetPasswordSucceed = false;
      state.isResetPasswordFailed = false;
      state.error = null;
      // return {...state, isResetPasswordPending: true, isResetPasswordSucceed: false, isResetPasswordFailed: false, error: null};
    })
    .addCase(resetPasswordThunk.fulfilled, (state) => {
      state.isResetPasswordPending = false;
      state.isResetPasswordSucceed = true;
      state.isResetPasswordFailed = false;
      state.error = null;
      // return {...state, isResetPasswordPending: false, isResetPasswordSucceed: true, isResetPasswordFailed: false, error: null};
    })
    .addCase(resetPasswordThunk.rejected, (state, action) => {
      state.isResetPasswordPending = false;
      state.isResetPasswordSucceed = false;
      state.isResetPasswordFailed = true;
      state.error = action.payload;
      // return {...state, isResetPasswordPending: false, isResetPasswordSucceed: false, isResetPasswordFailed: true, error: action.payload};
    })
    .addCase(updateProfileInfoThunk.pending, (state) => {
      state.isUpdateProfileInfoPending = true;
      state.isUpdateProfileInfoSucceed = false;
      state.isUpdateProfileInfoFailed = false;
      state.error = null;
      // return {...state, isUpdateProfileInfoPending: true, isUpdateProfileInfoSucceed: false, isUpdateProfileInfoFailed: false, error: null};
    })
    .addCase(updateProfileInfoThunk.fulfilled, (state) => {
      state.isUpdateProfileInfoPending = false;
      state.isUpdateProfileInfoSucceed = true;
      state.isUpdateProfileInfoFailed = false;
      state.error = null;
      // return {...state, isUpdateProfileInfoPending: false, isUpdateProfileInfoSucceed: true, isUpdateProfileInfoFailed: false, error: null};
    })
    .addCase(updateProfileInfoThunk.rejected, (state, action) => {
      state.isUpdateProfileInfoPending = false;
      state.isUpdateProfileInfoSucceed = false;
      state.isUpdateProfileInfoFailed = true;
      state.error = action.payload;
      // return {...state, isUpdateProfileInfoPending: false, isUpdateProfileInfoSucceed: false, isUpdateProfileInfoFailed: true, error: action.payload};
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