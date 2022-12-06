import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api';
import { Layout } from '../components/Layout';
import { resetProfilePosts, setProfilePosts } from '../store/reducers/postReducer';

export const UserPage = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.user);
    useEffect(() => {
        const fetchProfilePosts = async () => {
            await axiosInstance
                .get('/post', { params: username })
                .then((response) => dispatch(setProfilePosts(response?.data)));
        };
        console.log('fetchprofile');
        fetchProfilePosts();
        return () => {
            dispatch(resetProfilePosts());
        };
    }, [dispatch, username]);

    return (
        <Layout classes='flex justify-center'>
            {user.username ? (
                <>
                    <p className='font-semibold text-3xl'>@{user.username}</p>
                </>
            ) : (
                <p className='font-semibold text-3xl'>Такого пользователя не существует</p>
            )}
        </Layout>
    );
};
