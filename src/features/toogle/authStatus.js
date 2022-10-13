import { createSlice } from '@reduxjs/toolkit';

const authStatus = createSlice({
  name: 'authStatus',
  initialState: { login: false, token: '' },
  reducers: {
    LoginStatus: (state, actions) => {
        state = actions.payload;
    },
  },
});

export const actions = authStatus.actions;
const auth = authStatus.reducer;
export default auth;
