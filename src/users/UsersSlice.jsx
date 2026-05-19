import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  }
);

export const postUsers = createAsyncThunk("postUsers", async (newUser) => {
  const request = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
    return request.data;
  }
);

export const deleteUsers = createAsyncThunk("deleteUsers", async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    return id;
  }
);

export const editUsers = createAsyncThunk("editUsers", async (updatedUser) => {
  const request = await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
    return request.data;
  }
);

const usersSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    Loading: false,
    Error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.Loading = true;
      state.Error = null;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.Loading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.Loading = false;
      state.Error = action.error.message;
    });

    builder.addCase(postUsers.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
    });

    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      state.data = state.data.filter(
        (user) => user.id !== action.payload
      );
    });

    builder.addCase(editUsers.fulfilled, (state, action) => {
      state.data = state.data.map((user) =>
        user.id === action.payload.id
          ? action.payload
          : user
      );
    });
  },
});
export default usersSlice.reducer;