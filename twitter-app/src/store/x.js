import { createSlice } from '@reduxjs/toolkit';
import {
  sagaApiCallBegan,
  sagaApiCallSuccess,
  sagaApiCallFailed,
} from './action/saga';
import { webSocketCallBegan, webSocketCallFailed } from './action/websocket.js';
import { normalize } from 'normalizr';
import { tweetSchema } from '../store/Schema/tweet.js';

const initialState = () => ({
  byTweetId: {},
  byUserId: {},
  allTweetIds: [],
});

// action, actionTypes and reducer
const slice = createSlice({
  name: 'tweets',
  initialState: initialState(),
  // reducers
  reducers: {
    tweetAdded: (state, action) => {
      const { entities, result } = normalize(action.payload, tweetSchema);
      Object.assign(state.byTweetId, entities.byTweetId);
      Object.assign(state.byUserId, entities.byUserId);
      state.allTweetIds.push(result);
    },
    tweetStoreReseted: (state) => initialState(),
  },
});

export const { tweetAdded, tweetStoreReseted } = slice.actions;
export default slice.reducer;

// Action creators
export const fetchTweets = (term) =>
  sagaApiCallBegan({
    url: `/setsearchterm/${term}`,
    method: 'get',
    onSuccess: sagaApiCallSuccess.type,
    onError: sagaApiCallFailed.type,
  });

export const fetchTweetsPause = () =>
  sagaApiCallBegan({
    url: '/pause',
    method: 'GET',
    onSuccess: sagaApiCallSuccess.type,
    onError: sagaApiCallFailed.type,
  });

export const getTweet = (message) =>
  webSocketCallBegan({
    message: message,
    onSuccess: tweetAdded.type,
    onError: webSocketCallFailed.type,
  });
