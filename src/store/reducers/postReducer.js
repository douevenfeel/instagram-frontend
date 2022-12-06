import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
    posts: [],
    profilePosts: [],
    post: {},
    author: {},
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, { payload }) => {
            state.posts = payload.rows;
            state.count = payload.count;
        },
        setProfilePosts: (state, { payload }) => {
            state.posts = payload.posts;
            state.author = payload.user;
            state.count = payload.count;
        },
        setPost: (state, { payload }) => {
            state.post = payload;
        },
        resetProfilePosts: (state) => {
            state.profilePosts = [];
            state.author = {};
        },
        resetPost: (state) => {
            state.post = {};
        },
    },
});

export const postReducer = postSlice.reducer;
export const { resetPost, resetProfilePosts, setProfilePosts, setPost, setPosts } = postSlice.actions;
