import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAPI } from '../../util/api/REST';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsersStatus',
  async () => {
    const response = await fetch('http://localhost:3333/test');
    const data = await response.json();
    console.log(data);
    return data;
  }
);
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    name: [],
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.name.push(action.payload + 'fulloaded');
    },
    [fetchUsers.pending]: (state, action) => {
      state.name.push('pending');
    },
    [fetchUsers.rejected]: (state, action) => {
      state.name.push(action.payload + ' rejected');
    },
  },
});
export const { reducer: user } = usersSlice;
export default user;
