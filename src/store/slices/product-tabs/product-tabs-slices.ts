import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TProductTabsState = {
  currentTabs: string;
}

const initialState: TProductTabsState = {
  currentTabs: '',
};

const productTabsSlices = createSlice({
  name: 'productTabs',
  initialState,
  reducers: {
    setProductTabs(state, action: PayloadAction<string>) {
      state.currentTabs = action.payload;
    },
  },
});

export default productTabsSlices.reducer;
export const {setProductTabs} = productTabsSlices.actions;
