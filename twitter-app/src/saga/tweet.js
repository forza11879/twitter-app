import { takeEvery, call, put, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../store/action/saga.js';
const port = process.env.REACT_APP_PORT;
const hostname = process.env.REACT_APP_LOCALHOST;
const baseURL = `http://${hostname}:${port}`;

function api({ dispatch }) {
  return function (next) {
    return function* (action) {
      if (action.type !== actions.sagaApiCallBegan.type) return next(action);
      next(action); // 'sagaApiCallBegan' to show in redux dev tools
      const { url, method, onSuccess, onError } = action.payload;
      try {
        const response = yield call(
          async () =>
            await axios.request({
              baseURL: baseURL,
              url,
              method,
              // headers,
              // data,
            })
        );
        if (onSuccess) yield put({ type: onSuccess, payload: response.data });
        // dispatch({ type: onSuccess, payload: response.data });
      } catch (error) {
        if (onError) yield put({ type: onError, payload: error });
        // dispatch({ type: onError, payload: error });
      }
    };
  };
}

function* watchApi() {
  yield takeEvery(actions.sagaApiCallBegan.type, api);
}

// const tweetSagas = [fork(watchApi)];
export default function* tweetSagas() {
  yield fork(watchApi());
}
// export default tweetSagas;

// function* api({ dispatch }, next, action) {
// function* api(action) {
//   // if (action.type !== actions.sagaApiCallBegan.type) return next(action);
//   // next(action); // 'sagaApiCallBegan' to show in redux dev tools
//   const { url, method, onSuccess, onError } = action.payload;
//   try {
//     const response = yield call(
//       async () =>
//         await axios.request({
//           baseURL: baseURL,
//           url,
//           method,
//           // headers,
//           // data,
//         })
//     );
//     if (onSuccess) yield put({ type: onSuccess, payload: response.data });
//     // dispatch({ type: onSuccess, payload: response.data });
//   } catch (error) {
//     if (onError) yield put({ type: onError, payload: error });
//     // dispatch({ type: onError, payload: error });
//   }
// }
