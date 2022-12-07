import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { resetPosts, setPosts } from '../store/reducers/postReducer';

export const HomePage = () => {
    const dispatch = useDispatch();
    const { posts, fetch } = useSelector((store) => store.post);
    useEffect(() => {
        const fetchPosts = async () => {
            await axiosInstance.get('/post').then((response) => dispatch(setPosts(response?.data)));
        };
        fetchPosts();

        return () => dispatch(resetPosts());
    }, [dispatch, fetch]);

    return (
        <Layout classes='flex flex-col items-center gap-8'>
            {posts.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </Layout>
    );
};
