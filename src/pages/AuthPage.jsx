import React, { useState } from 'react';

export const AuthPage = () => {
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
        const values = { username, password };
        console.log(values);
        setPassword('');
    };
    return (
        <div className='flex w-full h-screen pt-[72px] justify-center items-center'>
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
                <button className='h-10 py-2 px-6 rounded-md bg-blue-500 text-white' type='submit'>
                    {type === 'signin' ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <button className='self-center underline' onClick={handleType}>
                    {type === 'signin' ? 'Зарегистрироваться' : 'Войти'}
                </button>
            </form>
        </div>
    );
};
