import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../index.ts';
import { setError } from '../../action.ts';


const TIMEOUT_SHOW_ERROR = 2000;

export const clearErrorAction = createAsyncThunk(
  'error/setError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);
