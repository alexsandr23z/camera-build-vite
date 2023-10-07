import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { rootReducer } from '../root-reducer';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

type Reducer = ReturnType<typeof rootReducer>;

const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'app/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };

export { redirect };
export default browserHistory;
