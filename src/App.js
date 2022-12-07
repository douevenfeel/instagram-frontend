import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import axiosInstance from './api';
import { Header } from './components/Header';
import { AuthPage } from './pages/AuthPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';
import { UserPage } from './pages/UserPage';
import { setUser } from './store/reducers/userReducer';

export const App = () => {
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const checkout = async () => {
                await axiosInstance.get('/auth/refresh').then((response) => dispatch(setUser(response?.data)));
            };
            checkout();
        }
    }, [dispatch]);

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth' element={<AuthPage />} />
                {user.username && <Route path='/create' element={<CreatePostPage />} />}
                <Route path='/user/:username' element={<UserPage />} />
                <Route path='/post/:id' element={<PostPage />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </>
    );
};
