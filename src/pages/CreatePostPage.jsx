import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import { Layout } from '../components/Layout';

export const CreatePostPage = () => {
    const { user } = useSelector((store) => store.user);
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!!photo) {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('photo', photo[0]);
            const createPost = async () => {
                await axiosInstance.post('/post', formData).then(() => navigate(`/user/${user.username}`));
            };
            createPost();
        }
    };
    return (
        <Layout classes='justify-center flex'>
            <form className='flex flex-col gap-4 w-[400px]' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='description'>Описание</label>
                    <input
                        id='description'
                        className='border h-10 py-2 px-4 outline-none rounded-md'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Описание'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='file'>Фотография: </label>
                    <input
                        id='file'
                        type='file'
                        accept='image/png, image/gif, image/jpeg'
                        onChange={(e) => setPhoto(e.target.files)}
                    />
                </div>
                <button className='h-10 py-2 px-4 outline-none rounded-md bg-blue-500 text-white' type='submit'>
                    Выложить
                </button>
            </form>
        </Layout>
    );
};
