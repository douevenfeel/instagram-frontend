import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import axiosInstance from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/reducers/userReducer';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
    const { user } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [type, setType] = useState('signin');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleType = () => {
        type === 'signin' ? setType('signup') : setType('signin');
        setUsername('');
        setPassword('');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            const values = { username, password };
            const auth = async () => {
                await axiosInstance.post(`/auth/${type}`, values).then((response) => dispatch(setUser(response?.data)));
            };
            auth();
            setPassword('');
        }
    };

    useEffect(() => {
        user.username && navigate('/');
    }, [navigate, user.username]);

    return (
        <Layout classes='flex justify-center items-center'>
            <form className='flex flex-col w-80 gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor='username'>Имя пользователя</label>
                    <input
                        id='username'
                        className='border h-10 py-2 px-4 outline-none rounded-md'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Имя пользователя...'
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='password'>Пароль</label>
                    <input
                        id='password'
                        className='border h-10 py-2 px-4 outline-none rounded-md'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Пароль...'
                    />
                </div>
                <button className='h-10 py-2 px-6 rounded-md bg-blue-500 text-white outline-none' type='submit'>
                    {type === 'signin' ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <button className='self-center underline' onClick={handleType}>
                    {type === 'signin' ? 'Зарегистрироваться' : 'Войти'}
                </button>
            </form>
        </Layout>
    );
};
