import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 25,
};

export const counterSlice = createSlice({
  name: 'COUNTER',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementAmount: (state, action) => {
      state.value += action.payload;
    },
    decrementAmount: (state, action) => {
      state.value -= action.payload;
    },
  },
});

//acction creator are generated for each case reducer function
export const { increment, decrement, incrementAmount,decrementAmount } = counterSlice.actions;
export default counterSlice.reducer