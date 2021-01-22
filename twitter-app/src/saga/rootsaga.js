import { fork } from 'redux-saga/effects';
import { watchToast, watchToastError } from './toast.js';
import { watchApi } from './tweet.js';
import { watchWebsocket } from './websocket.js';

export default function* rootSaga() {
  yield fork(watchApi);
  yield fork(watchToast);
  yield fork(watchToastError);
  yield fork(watchWebsocket);
}
