import axios from 'axios';
import * as actions from '../api.js';

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan) return next(action);
  next(action); // 'apiCallBegan' to show in redux dev tools
  const { url, method, onSuccess, onError } = action.payload;

  // console.log('greeting: ', greeting);
  try {
    // const response = await axios.request({
    //   baseURL: 'http://localhost:3000',
    //   url,
    //   method,
    //   // headers,
    //   // data,
    // });
    const response = await fetch(url, {
      method,
      // headers,
    });
    console.log('response: ', response.json());
    // console.log('response: ', response.data);
    // General
    // dispatch(actions.apiCallSuccess(response.data));
    // dispatch(actions.apiCallSuccess(greeting));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.json() });
    // if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    // if (onSuccess)
    //   dispatch({ type: onSuccess, payload: { description: greeting } });
  } catch (error) {
    // General
    // dispatch(actions.apiCallFailed(error));
    // Specific
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default api;
