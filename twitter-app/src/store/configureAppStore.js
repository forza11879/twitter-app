import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
// import reducer from './entities';
// import tweetReducer from './tweets';
import api from './middleware/api.js';
// import webSocket from './middleware/webSocket';

// reduxjs/toolkit allows us to dispatch async actions
export default function configureAppStore() {
  // configureStore enables to dispatch async actions
  return configureStore({
    reducer,
    // tweetReducer,
    middleware: [...getDefaultMiddleware(), api],
  });
}
