import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

let callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data,
  });
};

export function* fetchDataSaga() {
  try {
    let result = yield call(() =>
      callAPI({ url: 'https://5ce2c23be3ced20014d35e3d.mockapi.io/api/todos' })
    );
    yield put(fetchData(result.data));
  } catch (e) {
    yield put({ type: 'TODO_FETCH_FAILED' });
  }
}

const apiUrl = `https://jsonplaceholder.typicode.com/users`;
function getApi() {
  return fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

function* fetchUsers(action) {
  try {
    const users = yield call(getApi);
    yield put({ type: 'GET_USERS_SUCCESS', users: users });
  } catch (e) {
    yield put({ type: 'GET_USERS_FAILED', message: e.message });
  }
}

function* userSaga() {
  yield takeEvery('GET_USERS_REQUESTED', fetchUsers);
}

export default userSaga;

import { all } from 'redux-saga/effects';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([userSaga()]);
}

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index.js';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension && window.devToolsExtension()
)(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

export default store;
