import { takeEvery, call, put, fork } from 'redux-saga/effects';
import notify from '../utils/toastify';
import * as actions from '../store/action/saga.js';

function* toast(action) {
  const { type, message } = action.payload;

  const options = {
    type: type,
    message: message,
  };
  try {
    yield call(notify, options);
  } catch (error) {
    console.log('toastSuccess error: ', error);
  }
}

export function* watchToast() {
  yield takeEvery(actions.sagaApiCallSuccess.type, toast);
}

function* toastError(action) {
  console.log('action: ', action);

  const options = {
    type: 'error',
    message: action.payload,
  };
  try {
    yield call(notify, options);
  } catch (error) {
    console.log('toastError error: ', error);
  }
}

export function* watchToastError() {
  yield takeEvery(actions.sagaApiCallFailed.type, toastError);
}
