import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
  // webSocketCallBegan,
  // webSocketCallFailed,
} from './api.js';
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
    // action => action handlers(no async api calls inside reducers just get the current state and return a new state. no side effects, no api calls, no DOM manipulations, no state mutations). This will make our reducers really easy to test. Code with the side effects should be put into action creators.
    // notion of the (action creater - command) - (event - reducer)
    //                                 addTweet - tweetAdded
    // UI layer should receive only notions of the command ex: addTweet (action creator - command)
    // notion of the event (tweetAdded - should not be exported) should used in the implementation inside the Action creator
    tweetAdded: (state, action) => {
      // const normalizedData = normalize(action.payload, tweetSchema);
      const { entities, result } = normalize(action.payload, tweetSchema);
      Object.assign(state.byTweetId, entities.byTweetId);
      Object.assign(state.byUserId, entities.byUserId);
      state.allTweetIds.push(result);
    },
    tweetPauseReceived: (state, action) => {
      // console.log('action.payload', action.payload);
      console.log('tweetPauseReceived:', action.payload.description);
    },

    tweetStoreReseted: (state) => initialState(),
  },
});

export const {
  tweetAdded,
  tweetReceived,
  tweetPauseReceived,
  tweetStoreReseted,
} = slice.actions;
export default slice.reducer;

// Action creators
export const fetchTweets = (term) =>
  apiCallBegan({
    url: `http://localhost:3000/setsearchterm/${term}`,
    method: 'get',
    // data: JSON.stringify({ term }), // data to send to the server
    // onSuccess: tweetReceived.type,
    onSuccess: apiCallSuccess.type,
    onError: apiCallFailed.type,
  });

export const fetchTweetsPause = () =>
  apiCallBegan({
    greeting: 'Hello',
    // url: '/pause',
    // method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // data: JSON.stringify({ term }), // data to send to the server
    onSuccess: tweetPauseReceived.type,
    // onSuccess: apiCallSuccess.type,
    onError: apiCallFailed.type,
  });

// export const fetchTweetsWebSocket = (client) =>
//   webSocketCallBegan({
//     socket: client,
//     onSuccess: tweetAdded.type,
//     // onSuccess: apiCallSuccess.type,
//     onError: webSocketCallFailed.type,
//   });

const allTweetIdsSelector = (state) => state.entities.tweets.allTweetIds;
const byTweetIdSelector = (state) => state.entities.tweets.byTweetId;
const byUserIdSelector = (state) => state.entities.tweets.byUserId;

// Selectors - Memoized Selector - it does not cause multiple re-renders
export const selectFilteredTweets = createSelector(
  byTweetIdSelector,
  // if the list of byTweetId remains the same
  // resolve function will not recalculate again
  (byTweetId) => byTweetId
);

export const selectAllTweetIds = createSelector(
  allTweetIdsSelector,
  (allTweetIds) => allTweetIds
);

export const selectTweetById = (id) =>
  createSelector(byTweetIdSelector, (byTweetId) => byTweetId[id]);

export const selectUserById = (id) =>
  createSelector(byUserIdSelector, (byUserId) => byUserId[id]);

// export const getUserById = (id) =>
//   createSelector(
//     getTweetById(id),
//     byUserIdSelector,
//     (UserId, byUserId) => byUserId[UserId]
//   );
