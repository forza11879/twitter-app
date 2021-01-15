import notify from '../../utils/toastify.js';
import * as actions from '../action/api.js';
const toast = ({ dispatch }) => (next) => (action) => {
  switch (action.type) {
    case actions.apiCallFailed.type:
      next(action); // 'apiCallFailed' to show in redux dev tools
      notify('error', action.payload.message);
      break;
    case actions.apiCallSuccess.type:
      next(action);
      notify('success', action.payload.message);
      break;
    default:
      next(action);
  }
};

export default toast;
