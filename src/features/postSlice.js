import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { addNewPost, deletePost, fetchPosts, updatePost } from "../services";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const posts = action.payload;
        let min = 1;
        const loadedPosts = posts.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        state.posts = [...state.posts, ...loadedPosts];
        // state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const addPost = action.payload;
        const posts = state.posts;

        addPost.id = posts[posts.length - 1].id + 1;
        addPost.userId = Number(addPost.userId);
        addPost.date = new Date().toISOString();

        addPost.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };

        state.posts.push(addPost);
        state.posts.sort((a, b) => b.date.localeCompare(a.date));
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
        // post güncellendikten sonra postu son sayfaya attığı için yüklenme zamanına göre sıralama yapıldı
        state.posts.sort((a, b) => b.date.localeCompare(a.date));
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
