import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

export const postUsers = createAsyncThunk("postUsers" , async (newUser) => {
  const request = await axios.post(`https://jsonplaceholder.typicode.com/users` , newUser);
  return request?.data;
});

const usersSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    Loading: false,
    Error: null,
  },
  reducers: [],

  extraReducers: (builder) => {
    // GET
    (builder.addCase(fetchUsers.pending, (state) => {
      ((state.Loading = true), (state.Error = null));
    }),
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        ((state.Loading = false),
          (state.Error = null),
          (state.data = action.payload));
      }),
      builder.addCase(fetchUsers.rejected, (state, action) => {
        ((state.Loading = false), (state.Error = action.error.message));
      }));

      // POST
      builder.addCase(postUsers.fulfilled , (state , action) => {
        state?.data?.unshift(action?.payload);
      });
  },
});
export default usersSlice.reducer