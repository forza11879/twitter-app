import axios from 'axios';
import * as actions from '../api.js';

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan) return next(action);
  next(action); // 'apiCallBegan' to show in redux dev tools
  const { url, method, data, onSuccess, onError } = action.payload;
  try {
    const response = await axios.request({
      // baseURL: 'http://localhost:3000',
      url,
      method,
      data,
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error));
    // Specific
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default api;
