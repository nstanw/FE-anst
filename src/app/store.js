import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import counterReducer from '../features/counter/counterSlice';
import studyReducer from '../features/data/studyDetail';

const rootReducer = combineReducers({
  counter: counterReducer,
  study : studyReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(logger),
});
