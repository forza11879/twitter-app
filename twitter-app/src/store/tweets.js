import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
// action, actionTypes and reducer
const slice = createSlice({
  name: 'tweets',
  initialState: [],
  reducers: {
    // action => action handlers
    tweetAdded: (state, action) => {
      state.push({ tweet: action.payload });
    },
  },
});

export const { tweetAdded } = slice.actions;
export default slice.reducer;

// Memoized Selectors - it does not cause multiple re-renders
export const getFilteredTweets = createSelector(
  (state) => state.entities.tweets,
  (tweets) => tweets.filter((tweet) => console.log('tweet', tweet))
);
