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
    task: {
      name: 'Task...',
      countDown: 25 ,
    },
  },
  reducers: {
    showTaskForm: (state) => {
      state.taskForm = !state.taskForm;
    },
    resetForm: (state) => {
      state.task = state.task;
    },
    addTask: (state, action) => {
      state.task = action.payload;
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
export const { showTaskForm,activeYoutube, activeImage, activeToogle, linkYoutube, resetForm ,addTask} = studySlice.actions;
export const { reducer: user } = studySlice;
export default user;
