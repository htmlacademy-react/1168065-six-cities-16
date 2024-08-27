import store from '@src/store';
import { AxiosInstance } from 'axios';
import { AuthError } from './auth';

// типы для thunks
export type ThunksAPI = {
  state: State;
  extra: AxiosInstance;
  dispatch: AppDispatch;
  rejectValue: AuthError;
};

// типы для стора редакса
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
