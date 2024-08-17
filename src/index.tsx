import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@components/app/app';
import { Provider } from 'react-redux';
import store from './store';
import { checkAuth } from './store/thunks/user';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuth());

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Provider>
  </StrictMode>
);
