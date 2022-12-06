import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { setPosts } from '../store/reducers/postReducer';

export const HomePage = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((store) => store.post);
    useEffect(() => {
        const fetchPosts = async () => {
            await axiosInstance.get('/post').then((response) => dispatch(setPosts(response?.data)));
        };
        fetchPosts();
    }, [dispatch]);
    return (
        <Layout>
            {posts.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </Layout>
    );
};
