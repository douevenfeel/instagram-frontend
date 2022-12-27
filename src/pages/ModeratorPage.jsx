import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { UsersModerator } from '../components/UsersModerator';
import { setPosts } from '../store/reducers/postReducer';

export const ModeratorPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.user);
    const { posts, fetch } = useSelector((store) => store.post);
    const [category, setCategory] = useState('posts');

    const handleCategory = (value) => {
        setCategory(value);
    };

    const navigate = useNavigate();
    useEffect(() => {
        const fetchPosts = async () => {
            await axiosInstance.get('/post').then((response) => dispatch(setPosts(response?.data)));
        };
        fetchPosts();
        user.role !== 'MODERATOR' && navigate('/');
    }, [dispatch, navigate, user.role, fetch]);

    return (
        <Layout classes='flex flex-col items-center gap-8'>
            <div className='flex justify-around w-1/2'>
                <button
                    onClick={() => handleCategory('posts')}
                    className={`border h-10 py-2 px-4 outline-none rounded-md ${
                        category === 'posts' ? 'bg-gray-200' : ''
                    }`}
                >
                    Посты
                </button>
                <button
                    onClick={() => handleCategory('users')}
                    className={`border h-10 py-2 px-4 outline-none rounded-md ${
                        category === 'users' ? 'bg-gray-200' : ''
                    }`}
                >
                    Пользователи
                </button>
            </div>
            {category === 'posts' ? (
                posts.length > 0 ? (
                    posts.map((post) => <Post key={post.id} {...post} />)
                ) : (
                    <p className='font-semibold text-2xl'>Здесь пока пусто</p>
                )
            ) : (
                <UsersModerator />
            )}
        </Layout>
    );
};
