import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axiosInstance from './api';
import { Header } from './components/Header';
import { AuthPage } from './pages/AuthPage';
import { BannedPage } from './pages/BannedPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { HomePage } from './pages/HomePage';
import { ModeratorPage } from './pages/ModeratorPage';
import { PostPage } from './pages/PostPage';
import { UserPage } from './pages/UserPage';
import { setUser } from './store/reducers/userReducer';

export const App = () => {
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const checkout = async () => {
                await axiosInstance.get('/auth/refresh').then((response) => dispatch(setUser(response?.data)));
            };
            checkout();
        }
        user.isBanned && navigate('/banned');
    }, [dispatch, navigate, user.isBanned]);

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth' element={<AuthPage />} />
                {user.username && <Route path='/create' element={<CreatePostPage />} />}
                <Route path='/user/:username' element={<UserPage />} />
                <Route path='/post/:id' element={<PostPage />} />
                <Route path='/moderator' element={<ModeratorPage />} />
                <Route path='*' element={<Navigate to='/' replace />} />
                {user.isBanned && (
                    <>
                        <Route path='/banned' element={<BannedPage />} />
                        <Route path='*' element={<Navigate to='/banned' replace />} />
                    </>
                )}
            </Routes>
        </>
    );
};
