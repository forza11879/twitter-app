import { combineReducers } from 'redux';
import tweetReducer from './tweets';
// combining multiple reducers into one entity
export default combineReducers({
  tweets: tweetReducer,
  // entities: tweetReducer,
});
