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

  const chartDay = {
    minutes: [],
    effective: [],
    labelsTime: [],
    notes: [],
    skills: [],
  };

  data.map((x) => {
    chartDay.minutes = [...chartDay.minutes, x.task.countDown];
    chartDay.effective = [...chartDay.effective, x.effective];
    chartDay.labelsTime = [...chartDay.labelsTime, x.labelsTime];
    chartDay.notes = [...chartDay.notes, x.notes];
    chartDay.skills = [...chartDay.skills, x.skills];
  });
  console.log('ojb data getTask: ', chartDay);

  return chartDay;
});

const initialState = {
  apexChart: {
    x: [],
    y: [],
    labels: [],
    name,
  },
  task: [],
  chartData: {},
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
      state.postis.Susses = true;
    },
    [postTask.pending]: (state, action) => {
      state.post.isErr = false;
      state.post.isLoading = true;
      state.isSusses = false;
    },
    [postTask.rejected]: (state, action) => {
      state.isErr = true;
      state.isLoading = false;
      state.isSusses = false;
    },
    [getTask.fulfilled]: (state, action) => {
      state.chartData = action.payload;
    },
    [getTask.pending]: (state, action) => {
      state.isErr = false;
      state.isLoading = true;
      state.isSusses = false;
    },
    [getTask.rejected]: (state, action) => {
      state.isErr = true;
      state.isLoading = false;
      state.isSusses = false;
    },
  },
}); //
export const taskAction = TaskSlice.actions;
export const task = TaskSlice.reducer;
export default task;
