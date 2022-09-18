import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAPI } from '../../util/api/REST';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsersStatus',
  async () => {
    const response = await fetch('http://localhost:3333/test');
    const data = await response.json();
    console.log(data);
    return data;
  }
);
const studySlice = createSlice({
  name: 'study',
  initialState: {
    modeOn: false,
    taskForm: false,
    active:{
      toogle: 'active',
      youtube: '',
      image:'',
    },
    youtube: {
      link: 'https://www.youtube.com/watch?v=1BUq426m7Fg',
      autoplay: false,
    },
    task: [{
      name: 'Task...',
      countDown: 25 ,
    }],
  },
  reducers: {
    showTaskForm: (state) => {
      state.taskForm = !state.taskForm;
    },
    resetForm: (state) => {
      state.task = state.task;
    },
    activeYoutube: (state) => {
      state.active.youtube = 'active';
      state.active.toogle = '';
      state.active.image = '';
    },
    activeImage: (state) => {
      state.active.youtube = '';
      state.active.toogle = '';
      state.active.image = 'active';
    },
    activeToogle: (state) => {
      state.active.youtube = '';
      state.active.toogle = 'active';
      state.active.image = '';
    },
    linkYoutube: (state, action) => {
      state.youtube.link = action.payload.link;
      state.youtube.autoplay = action.payload.autoplay;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      // state.name.push(action.payload + 'fulloaded');
    },
    [fetchUsers.pending]: (state, action) => {
      // state.name.push('pending');
    },
    [fetchUsers.rejected]: (state, action) => {
      // state.name.push(action.payload + ' rejected');
    },
  },
});
export const { showTaskForm,activeYoutube, activeImage, activeToogle, linkYoutube, resetForm } = studySlice.actions;
export const { reducer: user } = studySlice;
export default user;
