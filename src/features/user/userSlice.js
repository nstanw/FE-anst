import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const getUserAPI = createAsyncThunk('GET_User',
 async () => {
  try {
    const url = 'http://localhost:3333/getUser';
    const Respose = await axios.get(url);
    console.log('Respose getUserAPI:', Respose.data);
    return Respose.data;
  } catch (error) {
    return rejectWithValue(err.response.data);
  }
});
export const postUserAPI = createAsyncThunk('POST_User',
 async (img) => {
  try {
    const url = 'http://localhost:3333/postavatar';
    const Respose = await axios.post(url, img);
    console.log('Respose postUserAPI:', Respose.data);
    return Respose.data;
  } catch (error) {
    return rejectWithValue(err.response.data);
  }
});
const initialState = {
  image: 'a',
  video: 'a',
  post: { isErr: false, isLoading: true, isSusses: false },
  get: { isErr: false, isLoading: true, isSusses: false },
};
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserAPI.pending]: (state, action) => {
     state.get.isErr = false;
      state.get.isLoading = true;
      state.get.isSusses = false;
    },
    [getUserAPI.fulfilled]: (state, action) => {
      state.image = action.payload.image;
      state.video = action.payload.video;
      state.get.isErr = false;
      state.get.isLoading = false;
      state.get.isSusses = true;
    },
    [getUserAPI.rejected]: (state, action) => {
        state.get.isErr = true;
        state.get.isLoading = false;
        state.get.isSusses = false;
    },
    [postUserAPI.pending]: (state, action) => {
     state.post.isErr = false;
      state.post.isLoading = true;
      state.post.isSusses = false;
    },
    [postUserAPI.fulfilled]: (state, action) => {
      state.image = action.payload.image;
      state.video = action.payload.video;
      state.post.isErr = false;
      state.post.isLoading = false;
      state.post.isSusses = true;
    },
    [postUserAPI.rejected]: (state, action) => {
        state.post.isErr = true;
        state.post.isLoading = false;
        state.post.isSusses = false;
    },
  }, //
});

export const userActions = UserSlice.actions;
export const users = UserSlice.reducer;
export default users;
