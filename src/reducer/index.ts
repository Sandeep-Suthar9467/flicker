import { createSlice } from '@reduxjs/toolkit'




export const counterSlice = createSlice({
  name: 'flicker',
  initialState: {
    loading: false,
    images: [],
    page: 1,
    id:null,
    imageInfo: {}
  },
  reducers: {
    fetchImages: (state, action) => {
      return {...state, loading: true, page: action.payload };
    },
    onSuccessImages: (state, action) => {
        return {...state, loading: false, images: action.payload };
    },
    fetchImage: (state,action)=>{
      return {...state,loading: true,id: action.payload};
    },
    onSuccessImage: (state,action)=>{
      return {...state, loading: false, imageInfo: action.payload };
    }
  },
});

export const { fetchImages, onSuccessImages,fetchImage,onSuccessImage } = counterSlice.actions

export default counterSlice.reducer;
