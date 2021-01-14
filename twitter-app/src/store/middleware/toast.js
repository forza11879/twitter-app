import notify from '../toastify.js';
import * as actions from '../action/api.js';
const toast = ({ dispatch }) => (next) => async (action) => {
  if (action.type === actions.apiCallFailed.type) {
    next(action); // 'apiCallFailed' to show in redux dev tools
    notify('error', action.payload.message);
  } else if (action.type === actions.apiCallSuccess.type) {
    next(action); // 'apiCallSuccess' to show in redux dev tools
    notify('success', action.payload.message);
  } else {
    return next(action);
  }
};

export default toast;

// if (action.type !== actions.apiCallFailed.type) return next(action);
// next(action); // 'apiCallFailed' to show in redux dev tools

// notify('error', action.payload.message);
