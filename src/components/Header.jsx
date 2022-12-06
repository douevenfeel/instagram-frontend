import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
    const location = useLocation();
    const { user } = useSelector((store) => store.user);
    const isAuth = location.pathname.includes('auth');
    return (
        <div className='w-full flex py-6 px-10 items-center justify-between absolute'>
            <Link to='/'>INSTAGRAM</Link>
            {!isAuth && (
                <div className='flex gap-4 items-center'>
                    {!!user.username && (
                        <Link to='/create' className='py-2 px-6 rounded-md bg-blue-500 text-white'>
                            Добавить пост
                        </Link>
                    )}
                    <Link to='/auth'>Войти</Link>
                </div>
            )}
        </div>
    );
};
