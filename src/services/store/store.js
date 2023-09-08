import { configureStore } from "@reduxjs/toolkit";
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
})

const store = configureStore({
  reducer: {
    api: apiReducer,
    ingredients: ingredientsReducer,
    currentBurger: currentBurgerReducer,
    ui: uiReducer,
    user: userReducer,
    feed: feedDataReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: [...getDefaultMiddleware(), publicFeedDataMiddleware, privateFeedDataMiddleware] - устаревшее
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(publicFeedDataMiddleware, privateFeedDataMiddleware);
  },
});

export default store;

