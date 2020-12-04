import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

// reduxjs/toolkit allows us to dispatch async actions
export default function configureAppStore() {
  return configureStore({ reducer });
}
