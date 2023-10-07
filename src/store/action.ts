import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts';

const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
export const setError = createAction<string | null>('error/setError');

export { redirectToRoute };
