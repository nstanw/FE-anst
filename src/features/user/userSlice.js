import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PREFIX } from '../../util/fetchData';

export const getUserAPI = createAsyncThunk('GET_User', async () => {
  try {
    const getTokenInStorage = JSON.parse(localStorage.getItem('user'));
    const token = getTokenInStorage.token;
    const url = PREFIX + '/getUser';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: 'Bearer ' + token,
      },
    });
    const data = await response.json();
    console.log('getTokenInStorage>>>>>>', data);
    return data;
  } catch (error) {
    return console.log(error);
  }
});

export const postLinkImage = createAsyncThunk(
  'USER/POST_postLinkImage',
  async (img) => {
    try {
      const getTokenInStorage = JSON.parse(localStorage.getItem('user'));
      const token = getTokenInStorage.token;
      const url = PREFIX + '/postlinkimage';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          authentication: `Bearer ${token}`,
        },
      };
      const Respose = await axios.post(url, img, config);
      return Respose.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const postLinkAvatar = createAsyncThunk(
  'USER/POST_postLinkAvatar',
  async (img) => {
    try {
      const getTokenInStorage = JSON.parse(localStorage.getItem('user'));
      const token = getTokenInStorage.token;
      const url = PREFIX + '/user/postAvatar';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          authentication: `Bearer ${token}`,
        },
      };
      const Respose = await axios.post(url, img, config);
      return Respose.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const postUploadImageStudy = createAsyncThunk(
  'USER/POST_postUploadImageStudy',
  async (formData) => {
    try {
      const getTokenInStorage = JSON.parse(localStorage.getItem('user'));
      const token = getTokenInStorage.token;
      const url = PREFIX + '/user/postImg';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          authentication: `Bearer ${token}`,
        },
      };
      const Respose = await axios.post(url, formData, config);
      return Respose.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const postUploadAVATAR = createAsyncThunk(
  'USER/POST_postUplAVATAR',
  async (formData) => {
    try {
      const getTokenInStorage = JSON.parse(localStorage.getItem('user'));
      const token = getTokenInStorage.token;
      const url = PREFIX + '/user/uploadAvatar';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          authentication: `Bearer ${token}`,
        },
      };
      const Respose = await axios.post(url, formData, config);
      return Respose.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const postLinkVideo = createAsyncThunk(
  'POST_LinkVideo',
  async (video) => {
    try {
      const getTokenInStorage = JSON.parse(localStorage.getItem('user'));
      const token = getTokenInStorage.token;
      const url = PREFIX + '/updatevideo';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authentication: 'Bearer ' + token,
        },
      };
      const Respose = await axios.post(url, video, config);
      return Respose.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : {};
let isLoggin = !!localStorage.getItem('user');

const initialState = {
  users: user.user,
  image: 'https://gridfiti.com/wp-content/uploads/2021/09/Lofi-Girl.jpeg',
  video: 'nHeuZ8EIbSU',
  avatar: 'images/1665068658108-maxresdefault.jpg',
  isErr: false,
  isLoading: false,
  isSusses: false,
  isLoggin: isLoggin,
  getUserAPI: {
    user:{},
    isErr: false,
    isLoading: false,
    isSusses: false,
    errMess:'',
  },
  default: true,
  // token: token,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state, actions) => {
      state.isLoggin = false;
    },
    logIn: (state, actions) => {
      state.isLoggin = true;
      state.users = actions.payload.users;
    },
  },
  extraReducers: {
    [getUserAPI.pending]: (state, action) => {
      state.getUserAPI.isErr = false;
      state.getUserAPI.isLoading = true;
      state.getUserAPI.isSusses = false;
    },
    [getUserAPI.fulfilled]: (state, action) => {
      // state.users = action.payload;
      state.getUserAPI.user = action.payload;
      state.getUserAPI.isErr = false;
      state.getUserAPI.isLoading = false;
      state.getUserAPI.isSusses = true;
    },
    [getUserAPI.rejected]: (state, action) => {
      state.getUserAPI.isErr = true;
      state.getUserAPI.isLoading = false;
      state.getUserAPI.isSusses = false;
    },
    [postLinkImage.pending]: (state, action) => {
      // state.image.post.isErr = false;
      // state.image.post.isLoading = true;
      // state.image.post.isSusses = false;
    },
    [postLinkImage.fulfilled]: (state, action) => {
      // state.image.link = action.payload.result.image;
      // state.image.post.isErr = false;
      // state.image.post.isLoading = false;
      // state.image.post.isSusses = true;
    },
    [postLinkImage.rejected]: (state, action) => {
      // state.image.post.isErr = true;
      // state.image.post.isLoading = false;
      // state.image.post.isSusses = false;
    },
    [postLinkVideo.pending]: (state, action) => {
      // state.video.post.isErr = false;
      // state.video.post.isLoading = true;
      // state.video.post.isSusses = false;
    },
    [postLinkVideo.fulfilled]: (state, action) => {
      // state.video.id = action.payload.video;
      // state.video.post.isErr = false;
      // state.video.post.isLoading = false;
      // state.video.post.isSusses = true;
    },
    [postLinkVideo.rejected]: (state, action) => {
      // state.video.post.isErr = true;
      // state.video.post.isLoading = false;
      // state.video.post.isSusses = false;
    },
  },
});

export const userActions = UserSlice.actions;
export const users = UserSlice.reducer;
export default users;
