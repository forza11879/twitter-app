import { createAction } from '@reduxjs/toolkit';

export const sagaApiCallBegan = createAction('saga/apiCallBegan');
export const sagaApiCallSuccess = createAction('saga/apiCallSuccess');
export const sagaApiCallFailed = createAction('saga/apiCallFailed');

export const webSocketCallBegan = createAction('websocket/callBegan');
export const webSocketCallSuccess = createAction('websocket/callSuccess');
export const webSocketCallFailed = createAction('websocket/callFailed');
