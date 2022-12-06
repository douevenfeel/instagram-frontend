import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { UserPage } from './pages/UserPage';

export const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth' element={<AuthPage />} />
                <Route path='/user/:username' element={<UserPage />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </>
    );
};
