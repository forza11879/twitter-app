import axios from 'axios';
import * as actions from '../api.js';

const port = process.env.REACT_APP_PORT;
const hostname = process.env.REACT_APP_LOCALHOST;
const baseURL = `http://${hostname}:${port}`;

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);
  next(action); // 'apiCallBegan' to show in redux dev tools
  const { url, method, onSuccess, onError } = action.payload;
  try {
    const response = await axios.request({
      baseURL: baseURL,
      url,
      method,
      // headers,
      // data,
    });
    // General
    // dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    // dispatch(actions.apiCallFailed(error));
    // Specific
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default api;
