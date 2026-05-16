import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../users/UsersSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice
  }
});