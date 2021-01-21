import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
// import api from './middleware/api.js';
import toast from './middleware/toast.js';
import websocket from './middleware/websocket.js';
import createSagaMiddleware from 'redux-saga';
import tweetSagas from '../saga/tweet.js';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, websocket, toast];
// const middlewares = [api, websocket, toast];
const middleware = [...getDefaultMiddleware({ thunk: false }), ...middlewares];
// const middleware = [...getDefaultMiddleware(), ...middlewares];

const configureAppStore = () => {
  // reduxjs/toolkit configureStore enables to dispatch async actions
  return configureStore({
    reducer: reducer,
    middleware: middleware,
  });
};

sagaMiddleware.run(tweetSagas);

export default configureAppStore;
