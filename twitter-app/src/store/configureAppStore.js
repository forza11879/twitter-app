import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
// import api from './middleware/api.js';
import toast from './middleware/toast.js';
import websocket from './middleware/websocket.js';
import createSagaMiddleware from 'redux-saga';
import tweetSagas from '../saga/tweet.js';
// import { createStore, applyMiddleware, compose } from 'redux';
// import { initialState } from './tweets.js';

const configureAppStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, websocket, toast];
  const middleware = [
    ...getDefaultMiddleware({ thunk: false }),
    ...middlewares,
  ];

  const store = configureStore({
    reducer: reducer,
    middleware: middleware,
  });

  sagaMiddleware.run(tweetSagas);

  return store;
};

export default configureAppStore;

// const configureAppStore = compose(
//   applyMiddleware(websocket, toast, sagaMiddleware),
//   window.devToolsExtension && window.devToolsExtension(),
//   // sagaMiddleware.run
// )(createStore)(reducer);

// const middlewares = [sagaMiddleware, websocket, toast];
// const middleware = [...getDefaultMiddleware({ thunk: false }), ...middlewares];

// const middlewares = [api, websocket, toast];
// const middleware = [...getDefaultMiddleware(), ...middlewares];
