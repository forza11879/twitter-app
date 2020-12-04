import { combineReducers } from 'redux';
import entitiesReducer from './entities';
// combining multiple reducers
export default combineReducers({
  entities: entitiesReducer,
});
