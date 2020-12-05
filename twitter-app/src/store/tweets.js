import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api.js';

// action, actionTypes and reducer
const slice = createSlice({
  name: 'tweets',
  initialState: [],
  // reducers
  reducers: {
    // action => action handlers
    tweetAdded: (state, action) => {
      // state.push({ tweet: action.payload });
      state.push(action.payload);
    },
    tweetReceived: (state, action) => {
      console.log('actio.payload', action.payload);
    },
  },
});

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

// Selectors - Memoized Selector - it does not cause multiple re-renders
export const getFilteredTweets = createSelector(
  (state) => state.entities.tweets,
  (tweets) => tweets.filter((tweet) => console.log('tweet', tweet))
);
