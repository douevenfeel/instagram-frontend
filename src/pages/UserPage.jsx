import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api';
import { Layout } from '../components/Layout';
import { UserEstimates } from '../components/UserEstimates';
import { UserPosts } from '../components/UserPosts';
import { fetchPosts, resetProfilePosts, setProfilePosts } from '../store/reducers/postReducer';

export const UserPage = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [category, setCategory] = useState('posts');
    const { author } = useSelector((store) => store.post);
    const { user } = useSelector((store) => store.user);

    const handleCategory = (value) => {
        setCategory(value);
        dispatch(fetchPosts());
    };

    const handleBan = () => {
        const fetchBan = async () => {
            await axiosInstance.post(`/user/ban/${author.id}`).then(() => navigate('/'));
        };
        fetchBan();
    };

    useEffect(() => {
        const fetchProfilePosts = async () => {
            await axiosInstance.get(`/user/${username}`).then((response) => dispatch(setProfilePosts(response?.data)));
        };
        fetchProfilePosts();

        return () => dispatch(resetProfilePosts());
    }, [dispatch, username]);

    return (
        <Layout classes='flex items-center flex-col gap-8'>
            {author ? (
                <>
                    <p className='font-semibold text-2xl'>@{username}</p>
                    {user?.username === username && (
                        <>
                            <Link to='/create' className='py-2 px-6 rounded-md bg-blue-500 text-white'>
                                Добавить пост
                            </Link>
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
                                    onClick={() => handleCategory('estimated')}
                                    className={`border h-10 py-2 px-4 outline-none rounded-md ${
                                        category === 'estimated' ? 'bg-gray-200' : ''
                                    }`}
                                >
                                    Лайки
                                </button>
                            </div>
                        </>
                    )}
                    {user.role === 'MODERATOR' && user?.username !== username && (
                        <button className='py-2 px-6 rounded-md bg-red-500 text-white' onClick={handleBan}>
                            Забанить
                        </button>
                    )}
                    {category === 'posts' ? <UserPosts /> : <UserEstimates />}
                </>
            ) : (
                <p className='font-semibold text-2xl'>Такого пользователя не существует</p>
            )}
        </Layout>
    );
};
