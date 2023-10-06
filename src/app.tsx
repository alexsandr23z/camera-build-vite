import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import Main from './pages/main/main';
import { AppRoute } from './consts';
import Product from './pages/product/product';
import Basket from './pages/basket/basket';
import NotFound from './pages/not-found/not-found';

function App(): React.JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main/>}
          />
          <Route
            path={AppRoute.Product}
            element={<Product/>}
          >
            <Route path={`${AppRoute.Product}/:id`}/>
          </Route>
          <Route
            path={AppRoute.Basket}
            element={<Basket/>}
          />
          <Route
            path="*"
            element={<NotFound/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
