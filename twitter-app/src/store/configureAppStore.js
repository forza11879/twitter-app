import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
// import toast from './middleware/toast.js';
// import websocket from './middleware/websocket.js';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/rootsaga';

const configureAppStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  const middleware = [
    // ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    ...getDefaultMiddleware({ thunk: false }),
    ...middlewares,
  ];

  const store = configureStore({
    reducer: reducer,
    middleware: middleware,
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureAppStore;
