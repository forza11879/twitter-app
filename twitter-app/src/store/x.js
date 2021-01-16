import { call, put, takeEvery } from 'redux-saga/effects';

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

import { createSlice } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { tweetSchema } from '../store/Schema/tweet.js';

const initialState = () => ({
  byTweetId: {},
  byUserId: {},
  allTweetIds: [],
});

// action, actionTypes and reducer
const slice = createSlice({
  name: 'tweets',
  initialState: initialState(),
  // reducers
  reducers: {
    tweetAdded: (state, action) => {
      const { entities, result } = normalize(action.payload, tweetSchema);
      Object.assign(state.byTweetId, entities.byTweetId);
      // {...state.byTweetId, ...entities.byTweetId};
      Object.assign(state.byUserId, entities.byUserId);
      // {...state.byUserId, ...entities.byUserId};
      state.allTweetIds.push(result);
    },
  },
});
