import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'flicker',
  initialState: {
    loading: false,
    images: [],
    page: 1,
    isLoggedIn: false
  },
  reducers: {
    fetchImages: (state, action) => {
      return {...state, loading: true, page: action.payload };
    },
    onSuccessImages: (state, action) => {
        return {...state, loading: false, images: action.payload };
    },
    onLoginSuccess: (state) => {
      return {...state, loading: false, isLoggedIn: true };
    },
  },
});

export const { fetchImages, onSuccessImages, onLoginSuccess } = counterSlice.actions

export default counterSlice.reducer;
