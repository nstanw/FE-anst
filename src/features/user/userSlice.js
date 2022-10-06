import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const getUserAPI = createAsyncThunk('GET_User', async () => {
  try {
    const url = 'http://localhost:3333/getUser';
    const Respose = await axios.get(url);
    console.log(Respose.data);
    return Respose.data;
  } catch (error) {
    return rejectWithValue(err.response.data);
  }
});
export const postAvatar = createAsyncThunk(
  'POST_ImgStudy_User',
  async (img) => {
    try {
      const url = 'http://localhost:3333/postlinkimage';
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const Respose = await axios.post(url, img, config);
      return Respose.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const postLinkVideo = createAsyncThunk(
  'POST_LinkVideo',
  async (video) => {
    try {
      const url = 'http://localhost:3333/updatevideo';
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const Respose = await axios.post(url, video, config);
      return Respose.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
const initialState = {
  users: {},
  image: {
    link: 'https://gridfiti.com/wp-content/uploads/2021/09/Lofi-Girl.jpeg',
    post: { isErr: false, isLoading: false, isSusses: false },
    get: { isErr: false, isLoading: false, isSusses: false },
  },
  video: {
    id: 'MK9KDIXdrA0',
    post: { isErr: false, isLoading: false, isSusses: false },
    get: { isErr: false, isLoading: false, isSusses: false },
  },
  avatar: 'images/1665068658108-maxresdefault.jpg',
  isErr: false,
  isLoading: true,
  isSusses: false,
};
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserAPI.pending]: (state, action) => {
      state.isErr = false;
      state.isLoading = true;
      state.isSusses = false;
    },
    [getUserAPI.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.image.link = action.payload.image;
      state.video.id = action.payload.video;
      state.image.get.isErr = false;
      state.image.get.isLoading = false;
      state.image.get.isSusses = true;
      state.isErr = false;
      state.isLoading = false;
      state.isSusses = true;
    },
    [getUserAPI.rejected]: (state, action) => {
      state.get.isErr = true;
      state.get.isLoading = false;
      state.get.isSusses = false;
    },
    [postAvatar.pending]: (state, action) => {
      state.image.post.isErr = false;
      state.image.post.isLoading = true;
      state.image.post.isSusses = false;
    },
    [postAvatar.fulfilled]: (state, action) => {
      // state.image.link = action.payload.result.image;
      state.image.post.isErr = false;
      state.image.post.isLoading = false;
      state.image.post.isSusses = true;
    },
    [postAvatar.rejected]: (state, action) => {
      state.image.post.isErr = true;
      state.image.post.isLoading = false;
      state.image.post.isSusses = false;
    },
    [postLinkVideo.pending]: (state, action) => {
      state.video.post.isErr = false;
      state.video.post.isLoading = true;
      state.video.post.isSusses = false;
    },
    [postLinkVideo.fulfilled]: (state, action) => {
      // state.video.id = action.payload.video;
      state.video.post.isErr = false;
      state.video.post.isLoading = false;
      state.video.post.isSusses = true;
    },
    [postLinkVideo.rejected]: (state, action) => {
      state.video.post.isErr = true;
      state.video.post.isLoading = false;
      state.video.post.isSusses = false;
    },
  }, //
});

export const userActions = UserSlice.actions;
export const users = UserSlice.reducer;
export default users;
