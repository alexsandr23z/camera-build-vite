import ReactDOM from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { fetchProducts } from './store/api-action/products-api/products-api.ts';

store.dispatch(fetchProducts());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);
