import { createSlice } from '@reduxjs/toolkit';

const googleChart = createSlice({
  name: 'googleChart',
  initialState: {
    data: [
      ['Element', 'Density', { role: 'style' }],
      ['Copper', 8.94, '#b87333'], // RGB value
      ['Silver', 10.49, 'silver'], // English color name
      ['Gold', 19.3, 'gold'],
      ['Platinum', 21.45, 'color: #e5e4e2'], // CSS-style declaration
    ],
    chartType: 'ColumnChart',
    width: '100%',
    height: '400px',
  },
  reducers: {
    addColumChart: (state, actions) => {
      // tren cot, gia tri, mau
      state.data = state.data.concat(actions.payload);
    },
  },
});

export const ggChartActions = googleChart.actions;
const Chart = googleChart.reducer;
export default Chart;
