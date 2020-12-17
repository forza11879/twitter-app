import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api.js';
import { normalize } from 'normalizr';
import { tweetSchema } from '../store/Schema/tweet.js';

// action, actionTypes and reducer
const slice = createSlice({
  name: 'tweets',
  initialState: {
    byTweetId: {},
    byUserId: {},
    allTweetIds: [],
  },
  // reducers
  reducers: {
    // action => action handlers
    tweetAdded: (state, action) => {
      const normalizedData = normalize(action.payload, tweetSchema);
      // console.log('normalizedData: ', normalizedData);
      // console.log('byTweetId.id: ', normalizedData.entities.byTweetId['id'].id);
      Object.assign(state.byTweetId, normalizedData.entities.byTweetId);
      // state = { ...state.byTweetId, ...normalizedData.entities.byTweetId };
      Object.assign(state.byUserId, normalizedData.entities.byUserId);
      // state = { ...state.byUserId, ...normalizedData.entities.byUserId };
      state.allTweetIds.push(normalizedData.result);
    },
    tweetReceived: (state, action) => {
      console.log('action.payload', action.payload);
    },
    // This is the magic part - the normalize method will flatten
    // my deeply nested order according to my schemas defined
    // above.
    // normalizedOrder: (state, action) => {
    //   normalize(action, {
    //     order: orderSchema,
    //   });
    // },
  },
});

// export default function shopReducer(state = defaultState, action) {
//   switch (action.type) {
//     case 'DESERIALIZE_ORDER':
//       // This is the magic part - the normalize method will flatten
//       // my deeply nested order according to my schemas defined
//       // above.
//       var normalizedOrder = normalize(action, {
//         order: orderSchema,
//       });
//       // Due to using seamless-immutable we have to merge the new
//       // entities into the state.
//       return state.merge(normalizedOrder.entities);
//     default:
//       return state;
//   }
// }

export const { tweetAdded, tweetReceived } = slice.actions;
export default slice.reducer;

// Action creators
const url = '/setSearchTerm';
export const fetchTweets = (term) =>
  apiCallBegan({
    url: url,
    method: 'post',
    data: JSON.stringify({ term }), // data to send to the server
    // onSuccess: tweetReceived.type,
    // onSuccess: apiCallSuccess.type,
    // onError: apiCallFailed.type,
  });

// export const fetchTweetsWebSocket = (client) =>
//   apiCallBegan({
//     socket: client,
//     onSuccess: tweetAdded.type,
//     // onSuccess: apiCallSuccess.type,
//     // onError: apiCallFailed.type,
//   });

// Selectors - Memoized Selector - it does not cause multiple re-renders
export const getFilteredTweets = createSelector(
  (state) => state.entities.tweets.byTweetId,
  // (tweets) => tweets.filter((tweet) => console.log('tweet', tweet))
  // if the list of byTweetId and allTweetIds remains the same
  // resolve function will not recalculate again
  (byTweetId) => byTweetId
);

export const getAllTweetIds = createSelector(
  (state) => state.entities.tweets.allTweetIds,
  (allTweetIds) => allTweetIds
);

export const getTweetById = (id) =>
  createSelector(
    (state) => state.entities.tweets.byTweetId,
    (byTweetId) => byTweetId[id]
  );

export const getUserById = (id) =>
  createSelector(
    (state) => state.entities.tweets.byUserId,
    (byUserId) => byUserId[id]
  );
