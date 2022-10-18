import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { create } from 'yup/lib/Reference';
import userApi from '../../util/api/UserApi';

//Thunk Api
export const SignIn = createAsyncThunk(
  'auth/signin',
  async (param, thunkAPI) => {
    const response = await userApi.signIn(param);
    //Save accessToken to storage
    const { status, access_token, data } = response;
    localStorage.setItem('access_token', access_token);
    //https://www.ezfrontend.com/docs/dang-nhap-voi-jwt
  }
);

const authStatus = createSlice({
  name: 'authStatus',
  initialState: {
    login: false,
    token: null,
    openLogIn: false,
    openSignUp: false,
  },
  reducers: {
    LoginStatus: (state, actions) => {
      state.login = actions.payload.login;
      state.token = actions.payload.token;
    },
    logOut: (state, actions) => {
      state.login = false;
      state.token = null;
    },
    openSignUp: (state, actions) => {
      state.openSignUp = !state.openSignUp;
    },
    closeSignUp: (state, actions) => {
      state.openSignUp = false;
    },
    openLogIn: (state, actions) => {
      state.openLogIn = !state.openLogIn;
    },
  },
});

export const actions = authStatus.actions;
const auth = authStatus.reducer;
export default auth;
