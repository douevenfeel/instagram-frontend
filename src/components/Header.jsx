import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axiosInstance from '../api';
import { useDebounce } from '../hooks/useDebounce';
import { logout, setUsers, resetUsers } from '../store/reducers/userReducer';
import { UserIcon } from '../assets';

export const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { user, users } = useSelector((store) => store.user);
    const [isVisible, setIsVisible] = useState(false);
    const isAuth = location.pathname.includes('auth');

    const handleLogout = () => {
        const fetchLogout = async () => {
            await axiosInstance.post('/auth/logout').then(() => dispatch(logout()));
        };
        fetchLogout();
    };

    useEffect(() => {
        setIsVisible(false);
        setQ('');
        dispatch(resetUsers());
    }, [dispatch, location]);

    const [q, setQ] = useState('');
    const debouncedQ = useDebounce(q);
    useEffect(() => {
        const values = { q: debouncedQ };
        const fetchUsers = async () => {
            await axiosInstance.get('/user', { params: values }).then((response) => dispatch(setUsers(response?.data)));
        };
        !!debouncedQ && fetchUsers();
    }, [debouncedQ, dispatch]);
    return (
        <div className='w-full flex py-2 px-4 items-center justify-between gap-4 absolute top-0 left-0 flex-col md:flex-row md:py-4 md:px-10'>
            <Link to='/' className='font-semibold text-2xl'>
                INSTAGRAM
            </Link>
            {!isAuth && (
                <>
                    <div className='flex'>
                        <div className='flex gap-4'>
                            <input
                                placeholder='Имя пользователя...'
                                className='border h-10 py-2 px-4 outline-none rounded-md max-w-80'
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                onFocus={() => setIsVisible(true)}
                            />
                            {q && (
                                <button onClick={(e) => setIsVisible((prev) => !prev)}>
                                    {isVisible ? 'Скрыть' : 'Показать'}
                                </button>
                            )}
                        </div>
                        {isVisible && users.length > 0 && (
                            <div className='flex flex-col absolute h-[200px] overflow-auto gap-1 mt-11'>
                                {users.map((user) => (
                                    <Link
                                        key={user.id}
                                        className='border h-10 py-2 px-4 outline-none rounded-md w-80 bg-white'
                                        to={`/user/${user.username}`}
                                    >
                                        {user.username}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='flex gap-4 items-center'>
                        {!!user.username && (
                            <Link to={`/user/${user.username}`}>
                                <UserIcon className='w-10 h-10' />
                            </Link>
                        )}
                        {user.username ? <button onClick={handleLogout}>Выйти</button> : <Link to='/auth'>Войти</Link>}{' '}
                    </div>
                </>
            )}
        </div>
    );
};
