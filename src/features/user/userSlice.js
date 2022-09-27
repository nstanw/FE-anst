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
  }, //
});

export const userActions = UserSlice.actions;
export const users = UserSlice.reducer;
export default users;
