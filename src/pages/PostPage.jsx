import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { resetPost, setPost } from '../store/reducers/postReducer';

export const PostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { post, fetch } = useSelector((store) => store.post);
    useEffect(() => {
        const fetchPost = async () => {
            await axiosInstance.get(`/post/${id}`).then((response) => dispatch(setPost(response?.data)));
        };
        fetchPost();
        return () => dispatch(resetPost());
    }, [dispatch, id, fetch]);

    return (
        <Layout classes='flex items-center flex-col gap-8'>
            {post ? <Post {...post} /> : <p className='font-semibold text-2xl'>Такого поста не существует</p>}
        </Layout>
    );
};
