import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fetch: true,
    posts: [],
    profilePosts: [],
    estimatedPosts: [],
    post: {},
    author: {},
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchPosts: (state) => {
            console.log('fetchPosts');
            state.fetch = true;
        },
        setPosts: (state, { payload }) => {
            console.log('setPosts');
            state.fetch = false;
            console.log(payload);
            state.posts = payload;
        },
        setProfilePosts: (state, { payload }) => {
            console.log('setProfilePosts');
            state.profilePosts = payload.user.posts;
            state.author = { ...payload.user, likesCount: payload.likesCount };
            delete state.author.posts;
            state.fetch = false;
        },
        setEstimated: (state, { payload }) => {
            console.log('setEstimated');
            state.fetch = false;
            state.estimatedPosts = payload;
        },
        setPost: (state, { payload }) => {
            console.log('setPost');
            state.fetch = false;
            state.post = payload;
        },
        resetProfilePosts: (state) => {
            console.log('resetProfilePosts');
            state.profilePosts = [];
            state.estimatedPosts = [];
        },
        resetPosts: (state) => {
            console.log('resetPosts');
            state.posts = [];
        },
        resetPost: (state) => {
            console.log('resetPost');
            state.post = {};
        },
        resetEstimated: (state) => {
            console.log('resetEstimated');
            state.estimatedPosts = [];
        },
    },
});

export const postReducer = postSlice.reducer;
export const {
    fetchPosts,
    resetPosts,
    resetPost,
    resetProfilePosts,
    resetEstimated,
    setProfilePosts,
    setEstimated,
    setPost,
    setPosts,
} = postSlice.actions;
