import store from '@src/store';

// типы для стора редакса
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
