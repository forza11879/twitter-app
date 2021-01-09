import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/callBegan');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallFailed = createAction('api/callFailed');

export const webSocketCallBegan = createAction('webSocket/callBegan');
export const webSocketCallSuccess = createAction('webSocket/callSuccess');
export const webSocketCallFailed = createAction('webSocket/callFailed');
