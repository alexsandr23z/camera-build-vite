import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import Main from './pages/main/main';
import { AppRoute } from './consts';
import Product from './pages/product/product';
import Basket from './pages/basket/basket';
import NotFound from './pages/not-found/not-found';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './store/middleware/redirect';

function App(): React.JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main/>}
          />
          <Route
            path={AppRoute.Product}
            element={<Product/>}
          >
          </Route>
          <Route
            path={`${AppRoute.Product}/:id`}
            element={<Product/>}
          />
          <Route
            path={AppRoute.Basket}
            element={<Basket/>}
          />
          <Route
            path="*"
            element={<NotFound/>}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
