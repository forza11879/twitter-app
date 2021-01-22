import { takeEvery, call, put } from 'redux-saga/effects';
import * as actions from '../store/action/saga.js';

function* websocket(action) {
  const { message, onSuccess, onError } = action.payload;
  try {
    // General
    // dispatch(actions.apiCallSuccess(response.data));
    // Specific
    // console.log('message: ', JSON.parse(message));
    if (onSuccess) yield put({ type: onSuccess, payload: JSON.parse(message) });
  } catch (error) {
    // console.log('error: ', error);
    // General
    // dispatch(actions.apiCallFailed(error));
    // Specific
    // if (onError) dispatch({ type: onError, payload: error });
  }
}

export function* watchWebsocket() {
  yield takeEvery(actions.webSocketCallBegan.type, websocket);
}
