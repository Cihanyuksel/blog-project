import { configureStore } from "@reduxjs/toolkit";
import PostsReducer from "../features/postSlice";
import UsersReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    posts: PostsReducer,
    users: UsersReducer,
  },
});
