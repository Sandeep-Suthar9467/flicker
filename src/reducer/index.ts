import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'flicker',
  initialState: {
    loading: false,
    images: [],
    page: 1
  },
  reducers: {
    fetchImages: (state, action) => {
      return {...state, loading: true, page: action.payload };
    },
    onSuccessImages: (state, action) => {
        return {...state, loading: false, images: action.payload };
    }
  },
});

export const { fetchImages, onSuccessImages } = counterSlice.actions

export default counterSlice.reducer;
