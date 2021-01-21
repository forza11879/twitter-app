import { createAction } from '@reduxjs/toolkit';

export const sagaApiCallBegan = createAction('saga/apiCallBegan');
export const sagaApiCallSuccess = createAction('saga/apiCallSuccess');
export const sagaApiCallFailed = createAction('saga/apiCallFailed');

// export const sagaActions = {
//   FETCH_DATA_SAGA: sagaApiCallBegan.type,
// };
