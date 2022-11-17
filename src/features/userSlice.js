import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../services";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = (state) => state.users;
// export const selectUserById = (state, userId) => state.users.users.find(user => user.id  === userId)

export default usersSlice.reducer;
