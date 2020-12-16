import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
// import reducer from './entities';
// import tweetReducer from './tweets';
import api from './middleware/api.js';

// reduxjs/toolkit allows us to dispatch async actions
export default function configureAppStore() {
  return configureStore({
    reducer,
    // tweetReducer,
    middleware: [...getDefaultMiddleware(), api],
  });
}
