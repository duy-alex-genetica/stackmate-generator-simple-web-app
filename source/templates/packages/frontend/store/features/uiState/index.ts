import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
  currencyCode: "USD" | "VND";
}

const initialState: UIState = {
  currencyCode: 'USD'
};

const uiSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
  }
});

export const {

} = uiSlice.actions;

export default uiSlice.reducer;
