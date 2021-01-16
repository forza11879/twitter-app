import { createAction } from '@reduxjs/toolkit';

export const webSocketCallBegan = createAction('websocket/callBegan');
export const webSocketCallSuccess = createAction('websocket/callSuccess');
export const webSocketCallFailed = createAction('websocket/callFailed');
