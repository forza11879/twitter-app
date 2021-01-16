import * as actions from '../action/websocket.js';

const websocket = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.webSocketCallBegan.type) return next(action);
  next(action); // 'apiCallBegan' to show in redux dev tools
  const { message, onSuccess, onError } = action.payload;
  try {
    // General
    // dispatch(actions.apiCallSuccess(response.data));
    // Specific
    // console.log('message: ', JSON.parse(message));
    if (onSuccess) dispatch({ type: onSuccess, payload: JSON.parse(message) });
  } catch (error) {
    // console.log('error: ', error);
    // General
    // dispatch(actions.apiCallFailed(error));
    // Specific
    // if (onError) dispatch({ type: onError, payload: error });
  }
};

export default websocket;
