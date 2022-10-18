import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import counterReducer from '../features/counter/counterSlice';
import studyReducer from '../features/data/studyDetail';
import toogleReducer from '../features/toogle/toogleSlice';
import authStatusReducer from '../features/toogle/authStatus';
import chartReducer from '../features/data/GoogleCharSlice';
import apexChartReducer from '../features/data/ApexChartSlice';
import taskReducer from '../features/data/TaskSlice';
import userReducer from '../features/user/userSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  study: studyReducer,
  toogle: toogleReducer,
  chart: chartReducer,
  apexChart: apexChartReducer,
  task: taskReducer,
  user: userReducer,
  authStatus: authStatusReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({serializableCheck: false}).concat(logger),
});
