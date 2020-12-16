import * as actions from '../api.js';

export const webSocket = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan) return next(action);
  next(action); // 'apiCallBegan' to show in redux dev tools
  const { socket, onSuccess, onError } = action.payload;
  const client = JSON.parse(socket);
  console.log('websocket client: ', client);
  try {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const response = JSON.parse(message.data);
      // General
      // dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    };
  } catch (error) {
    // General
    // dispatch(actions.apiCallFailed(error));
    // Specific
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default webSocket;
