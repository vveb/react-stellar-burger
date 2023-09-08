import { createAction, createSlice } from "@reduxjs/toolkit";
import { closePublicFeed, closePrivateFeed } from "./api-state-slice";

export const publicFeedStart = createAction('PUBLIC_FEED_DATA_CONNECT');
export const publicFeedStop = createAction('PUBLIC_FEED_DATA_DISCONNECT');
export const privateFeedStart = createAction('PRIVATE_FEED_DATA_CONNECT');
export const privateFeedStop = createAction('PRIVATE_FEED_DATA_DISCONNECT');

const initialFeedDataState = {
  publicFeedData: null,
  privateFeedData: null,
};

const feedDataSlice = createSlice({
  name: 'feed',
  initialState: initialFeedDataState,
  reducers: {
    setPublicFeedData: (state, action) => ({ ...state, publicFeedData: action.payload }),
    setPrivateFeedData: (state, action) => ({ ...state, privateFeedData: action.payload }),
  },
  extraReducers: (builder) => builder
    .addCase(closePublicFeed, (state) => ({ ...state, publicFeedData: null }))
    .addCase(closePrivateFeed, (state) => ({ ...state, privateFeedData: null }))
});

export const {
  setPublicFeedData,
  setPrivateFeedData,
} = feedDataSlice.actions;

export default feedDataSlice.reducer;