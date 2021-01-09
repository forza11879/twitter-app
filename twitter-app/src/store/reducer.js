import { combineReducers } from 'redux';
import entitiesReducer from './entities';
// combining multiple reducers
export default combineReducers({
  entities: entitiesReducer,
});

// const reducer = (state, action) => {
//   if (action.type === 'tweets/resetTweetStore') {
//     state = undefined;
//   }
//   return combineReducers({
//     entities: entitiesReducer,
//   });
// };

// export default reducer;
