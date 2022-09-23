import { createSlice } from '@reduxjs/toolkit';

const ApexChart = createSlice({
  name: 'ApexChart',
  initialState: {
    name: 'Chart',
    data: {
      x: [35, 45, 75, 100],
      y: [1, 2, 4, 5],
    },
    options: {
      labels: [1, 2, 4, 5],
    },
    AIcom: {
      report: true,
    },
    feedback: {
      skills: ['nodejs', 'reactjs', 'reactjs'],
      notes: ['hay lam'],
    },
  },
  reducers: {
    addColumChart: (state, actions) => {
      state.name = actions.payload.name;
      state.data.x = state.data.x.concat(actions.payload.time);
      state.data.y = state.data.y.concat(actions.payload.effective);
      state.options.labels = state.options.labels.concat(
        actions.payload.labels
      );
      state.feedback.skills = state.feedback.skills.concat(
        actions.payload.skills
      );
      state.feedback.notes = state.feedback.notes.concat(actions.payload.notes);
    },
    AIcom: (state) => {
      state.AIcom.report = !state.AIcom.report;
    },
  },
});

export const ApexChartActions = ApexChart.actions;
const Chart = ApexChart.reducer;
export default Chart;
