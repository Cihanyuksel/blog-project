import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post(`${BASE_URL}/users`, initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    const response = await axios.put(`${BASE_URL}/posts/${id}`, initialPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${BASE_URL}/posts/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

// users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data
})
