import { createSlice } from '@reduxjs/toolkit'
import { Photo } from '../types/redux';




export const counterSlice = createSlice({
  name: 'flicker',
  initialState: {
    loading: false,
    images: [],
    page: 1,
    id:null,
    imageInfo: {},
    isLoggedIn: false,
    comments: [],
    photos: [] as Photo
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
      return {...state, loading: false, imageInfo: action.payload.photo ,comments: action.payload.comments};
    },
    onLoginSuccess: (state) => {
      return {...state, loading: false, isLoggedIn: true };
    },
    onLogoutSuccess: (state) => {
      return {...state, loading: false, isLoggedIn: false };
    },
    fetchAlbumDetails: (state)=>{
      return {...state,loading: true };
    },
    onSuccessAlbumDetails: (state,action)=>{
      return {...state, loading: false, albumsInfo: action.payload };
    },
    fetchPhotos: (state)=>{
      return {...state,loading: true };
    },
    onSuccessPhotos: (state,action)=>{
      return {...state, loading: false, photos: action.payload };
    },
    uploadImage: (state, action)=>{
      return {...state, loading: false, photos: [...state.photos, {url: action.payload}] };
    }
  },
});

export const { fetchImages, onSuccessImages,fetchImage,
  onSuccessImage ,onLoginSuccess,onLogoutSuccess, fetchAlbumDetails,
  onSuccessAlbumDetails, fetchPhotos, onSuccessPhotos, uploadImage } = counterSlice.actions
export default counterSlice.reducer;
