import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const getUserAPI = createAsyncThunk('GET_User', async () => {
  try {
    const url = 'http://localhost:3333/getUser';
    const Respose = await axios.get(url);
    console.log('Respose getUserAPI:', Respose.data);
    return Respose.data;
  } catch (error) {
    return rejectWithValue(err.response.data);
  }
});
export const postAvatar = createAsyncThunk('POST_Avater_User', async (img) => {
  try {
    const url = 'http://localhost:3333/postavatar';
    const Respose = await axios.post(url, img);
    console.log('Respose postAvatar:', Respose.data);
    return Respose.data;
  } catch (error) {
    return rejectWithValue(err.response.data);
  }
});
export const postLinkVideo = createAsyncThunk(
  'POST_LinkVideo',
  async (video) => {
    try {
      const url = 'http://localhost:3333/updatevideo';
      const Respose = await axios.post(url, video);
      return Respose.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
const initialState = {
  image: {
    link:'https://scontent.fvii1-1.fna.fbcdn.net/v/t1.6435-9/51672146_2261864930739783_377168149440626688_n.jpg?stp=dst-jpg_s960x960&_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_ohc=nfuulIHFd0sAX8npJ9Z&_nc_ht=scontent.fvii1-1.fna&oh=00_AT-zVoLgUGt4u939ChuPjhDwH24efG7gpe3VoJcAi3rEQw&oe=635A1B89',
    post: { isErr: false, isLoading: false, isSusses: false },
    get: { isErr: false, isLoading: false, isSusses: false },
  },
  video: {
    link: 'https://www.youtube.com/watch?v=IA-bzwypljQ&ab_channel=StudyWithMe',
    post: { isErr: false, isLoading: false, isSusses: false },
    get: { isErr: false, isLoading: false, isSusses: false },
  },
  post: { isErr: false, isLoading: false, isSusses: false },
  get: { isErr: false, isLoading: false, isSusses: false },
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
      state.image.link = action.payload.image;
      state.video.link = action.payload.video;
      state.get.isErr = false;
      state.get.isLoading = false;
      state.get.isSusses = true;
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
      state.image.link = action.payload.image;
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
      state.video.video = action.payload.video;
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
