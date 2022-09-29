import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postTask = createAsyncThunk(
  'Task/postTask', // Example POST method implementation:
  async (ojbdata) => {
    try {
      const Respose = await fetch(' http://localhost:3333/addtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
export const getTask = createAsyncThunk('Task/getTask', async () => {
  const response = await fetch('http://localhost:3333/gettask');
  const data = await response.json();
  console.log('getTask:', data);

  // const chartDay = {
  //   minutes: [],
  //   effective: [],
  //   labelsTime: [],
  //   notes: [],
  //   skills: [],
  //   create: [],
  // };

  // data.map((x) => {
  //   chartDay.minutes = [...chartDay.minutes, x.task.countDown];
  //   chartDay.effective = [...chartDay.effective, x.effective];
  //   chartDay.labelsTime = [...chartDay.labelsTime, x.labelsTime];
  //   chartDay.notes = [...chartDay.notes, x.notes];
  //   chartDay.skills = [...chartDay.skills, x.skills];
  //   chartDay.create = [...chartDay.create, x.createdAt];
  // });
  // console.log('ojb data getTask: ', chartDay);

  return data;
});

const initialState = {
  apexChart: {
    x: [],
    y: [],
    labels: [],
    name,
  },
  task: [],
  chartData: [],
  post: { isErr: false, isLoading: true, isSusses: false },
  get: { isErr: false, isLoading: true, isSusses: false },
};

const TaskSlice = createSlice({
  name: 'QLtask',
  initialState,
  reducers: {},
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
