import { createAction } from '@reduxjs/toolkit';

export const toastCallBegan = createAction('toast/callBegan');
export const toastCallSuccess = createAction('toast/callSuccess');
export const toastCallFailed = createAction('toast/callFailed');
