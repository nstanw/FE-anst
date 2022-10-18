import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PREFIX } from '../../util/fetchData';

export const postTask = createAsyncThunk(
  'TASK/POST_TASK', // Example POST method implementation:
  async (ojbdata) => {
    try {
      const getTokenInStorage = JSON.parse(localStorage.getItem('user'));
      const token = getTokenInStorage.token;
      const url = PREFIX + '/addtask';
      const Respose = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: 'Bearer ' + token,
        },
        body: JSON.stringify(ojbdata),
      });
      const content = await Respose.json();
      console.log('content= ', content);
      return content;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getTask = createAsyncThunk('TASK/GET_TASK', async () => {
  const getTokenInStorage = JSON.parse(localStorage.getItem('user'));
  const token = getTokenInStorage.token;
  const url = PREFIX + '/gettask';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: 'Bearer ' + token,
    },
  });
  const data = await response.json();
  return data;
});

const initialState = {
  apexChart: {
    x: [],
    y: [],
    labels: [],
  },
  task: [],
  chartData: [],
  note: '',
  post: { isErr: false, isLoading: true, isSusses: false },
  get: { isErr: false, isLoading: true, isSusses: false },
};

const TaskSlice = createSlice({
  name: 'QLtask',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.note = action.payload;
    },
  },
  extraReducers: {
    [postTask.fulfilled]: (state, action) => {
      state.task = state.task.concat(action.payload);
      state.post.isErr = false;
      state.post.isLoading = false;
      state.post.isSusses = true;
    },
    [postTask.pending]: (state, action) => {
      state.post.isErr = false;
      state.post.isLoading = true;
      state.isSusses = false;
    },
    [postTask.rejected]: (state, action) => {
      state.post.isErr = true;
      state.post.isLoading = false;
      state.isSusses = false;
    },
    [getTask.fulfilled]: (state, action) => {
      state.chartData = action.payload;
      state.chartData = action.payload;
      state.get.isErr = false;
      state.get.isLoading = false;
      state.get.isSusses = true;
    },
    [getTask.pending]: (state, action) => {
      state.get.isErr = false;
      state.get.isLoading = true;
      state.get.isSusses = false;
    },
    [getTask.rejected]: (state, action) => {
      state.get.isErr = true;
      state.get.isLoading = false;
      state.get.isSusses = false;
    },
  },
}); //
export const taskAction = TaskSlice.actions;
export const task = TaskSlice.reducer;
export default task;
