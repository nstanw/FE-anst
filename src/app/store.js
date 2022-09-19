import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import counterReducer from '../features/counter/counterSlice';
import studyReducer from '../features/data/studyDetail';
import toogleReducer from '../features/toogle/toogleSlice';
import chartReducer from '../features/data/GoogleCharSlice';
import apexChartReducer from '../features/data/ApexChartSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  study : studyReducer,
  toogle: toogleReducer,
  chart: chartReducer,
  apexChart: apexChartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(logger),
});
