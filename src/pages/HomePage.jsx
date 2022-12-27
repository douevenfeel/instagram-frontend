import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { resetPosts, setPosts } from '../store/reducers/postReducer';

export const HomePage = () => {
    const dispatch = useDispatch();
    const { posts, fetch } = useSelector((store) => store.post);
    const [order, setOrder] = useState({ title: 'new', order: ['createdAt', 'desc'] });
    useEffect(() => {
        const values = { order: order.order };
        const fetchPosts = async () => {
            await axiosInstance.get('/post', { params: values }).then((response) => dispatch(setPosts(response?.data)));
        };
        fetchPosts();

        return () => dispatch(resetPosts());
    }, [dispatch, fetch, order]);

    return (
        <Layout classes='flex flex-col items-center gap-8'>
            <div className='flex justify-around w-1/2 gap-2'>
                <button
                    onClick={() => setOrder({ title: 'new', order: ['createdAt', 'desc'] })}
                    className={`border min-h-10 py-2 px-4 outline-none rounded-md ${
                        order.title === 'new' ? 'bg-gray-200' : ''
                    }`}
                >
                    Сначала новые
                </button>
                <button
                    onClick={() => setOrder({ title: 'old', order: ['createdAt', 'asc'] })}
                    className={`border min-h-10 py-2 px-4 outline-none rounded-md ${
                        order.title === 'old' ? 'bg-gray-200' : ''
                    }`}
                >
                    Сначала старые
                </button>
                <button
                    onClick={() => setOrder({ title: 'popular', order: ['likesCount', 'desc'] })}
                    className={`border min-h-10 py-2 px-4 outline-none rounded-md ${
                        order.title === 'popular' ? 'bg-gray-200' : ''
                    }`}
                >
                    Популярные
                </button>
            </div>
            {posts.length > 0 ? (
                posts.map((post) => !post.user.isBanned && <Post key={post.id} {...post} />)
            ) : (
                <p className='font-semibold text-2xl'>Здесь пока пусто</p>
            )}
        </Layout>
    );
};
