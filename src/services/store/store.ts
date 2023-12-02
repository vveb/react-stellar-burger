import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook } from 'react-redux';
import apiReducer, {
  closePrivateFeed,
  closePublicFeed,
  discardPrivateFeed,
  discardPublicFeed,
  openPrivateFeed,
  openPublicFeed,
  requestPrivateFeed,
  requestPublicFeed,
  setApiError
} from './api-state-slice';
import ingredientsReducer from './ingredients-slice';
import currentBurgerReducer from "./current-burger-slice";
import uiReducer from './ui-slice';
import userReducer from './user-slice';
import feedDataReducer, {
  privateFeedStart,
  privateFeedStop,
  publicFeedStart,
  publicFeedStop,
  setPrivateFeedData,
  setPublicFeedData
} from "./feed-slice";
import socketMiddleware from "../middleware/socket-middleware";

const publicFeedDataMiddleware = socketMiddleware({
  wsUrl: 'wss://norma.nomoreparties.space/orders/all',
  wsActions: {
    wsConnect: publicFeedStart,
    wsDisconnect: publicFeedStop,
    onOpen: openPublicFeed,
    onClose: closePublicFeed,
    onError: setApiError,
    onMessage: setPublicFeedData,
    wsOpen: requestPublicFeed,
    wsClose: discardPublicFeed,
  },
  isPrivate: false,
});

const privateFeedDataMiddleware = socketMiddleware({
  wsUrl: 'wss://norma.nomoreparties.space/orders?token=',
  wsActions: {
    wsConnect: privateFeedStart,
    wsDisconnect: privateFeedStop,
    onOpen: openPrivateFeed,
    onClose: closePrivateFeed,
    onError: setApiError,
    onMessage: setPrivateFeedData,
    wsOpen: requestPrivateFeed,
    wsClose: discardPrivateFeed,
  },
  isPrivate: true,
});

const rootReducer = combineReducers({
  api: apiReducer,
  ingredients: ingredientsReducer,
  currentBurger: currentBurgerReducer,
  ui: uiReducer,
  user: userReducer,
  feed: feedDataReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: [...getDefaultMiddleware(), publicFeedDataMiddleware, privateFeedDataMiddleware] - устаревшее
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(publicFeedDataMiddleware, privateFeedDataMiddleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturnType = void> = ThunkAction<
  TReturnType,
  RootState,
  unknown,
  Action
>;
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

