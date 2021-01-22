import { takeEvery, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import notify from '../utils/toastify';
import * as actions from '../store/action/saga.js';
const port = process.env.REACT_APP_PORT;
const hostname = process.env.REACT_APP_LOCALHOST;
const baseURL = `http://${hostname}:${port}`;

const fetchApi = async ({ baseURL, url, method }) =>
  await axios.request({
    baseURL: baseURL,
    url: url,
    method: method,
  });

function* api(action) {
  const { url, method, onSuccess, onError } = action.payload;
  const options = {
    baseURL: baseURL,
    url: url,
    method: method,
  };
  try {
    const response = yield call(fetchApi, options);
    if (onSuccess)
      yield put({
        type: onSuccess,
        payload: response.data,
      });
  } catch (error) {
    if (onError) yield put({ type: onError, payload: error.message });
  }
}

export function* watchApi() {
  yield takeEvery(actions.sagaApiCallBegan.type, api);
}

// export default function* tweetSagas() {
//   yield fork(watchApi);
//   yield fork(watchToast);
//   yield fork(watchToastError);
//   yield fork(watchWebsocket);
// }
