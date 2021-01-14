import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import api from './middleware/api.js';
import toast from './middleware/toast.js';

// reduxjs/toolkit allows us to dispatch async actions
export default function configureAppStore() {
  // configureStore enables to dispatch async actions
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), api, toast],
  });
}
