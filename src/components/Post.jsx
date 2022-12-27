import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import { fetchPosts } from '../store/reducers/postReducer';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import dayjs from 'dayjs';

export const Post = ({ id, photo, description, user: author, likes, createdAt }) => {
    const { user } = useSelector((store) => store.user);
    const [isLiked, setIsLiked] = useState(false);
    const [value, setValue] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleEstimate = async () => {
        !location.pathname.includes('moderator') &&
            user.username &&
            (await axiosInstance.post(`/post/estimate/${id}`).then(() => dispatch(fetchPosts())));
    };

    const handleDoubleClick = (e) => {
        switch (e.detail) {
            case 2: {
                handleEstimate();
                break;
            }
            default: {
                break;
            }
        }
    };

    const handleEdit = () => {
        setValue(description);
        setIsEdit((prev) => !prev);
    };

    const handleUpdate = () => {
        setIsEdit(false);
        const values = { description: value };
        const fetchUpdate = async () => {
            console.log(value);
            await axiosInstance.put(`/post/${id}`, values).then(() => dispatch(fetchPosts()));
        };
        fetchUpdate();
    };

    const handleDelete = () => {
        const fetchDelete = async () => {
            await axiosInstance.delete(`/post/${id}`).then(() => dispatch(fetchPosts()));
        };
        fetchDelete();
        location.pathname.includes('post') && navigate(`/user${author?.username}`);
    };

    useEffect(() => {
        user?.username && setIsLiked(!!(!!likes && likes.filter((like) => like.userId === user.id)[0]));
    }, [likes, location.pathname, user.id, user?.username]);

    return (
        <div className='max-w-[720px] w-[92vw] flex flex-col'>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/${photo}`} alt={description} onClick={handleDoubleClick} />
            <div className='flex items-center gap-2'>
                {isLiked ? (
                    <FcLike onClick={handleEstimate} className='cursor-pointer' />
                ) : (
                    <FcLikePlaceholder onClick={handleEstimate} className='cursor-pointer' />
                )}
                <p>Нравится{likes && likes.length > 0 ? `: ${likes.length}` : ''}</p>
            </div>
            <Link to={`/user/${author?.username}`} className='font-semibold'>
                @{author?.username}
            </Link>
            <p>{description}</p>
            <p className='text-gray-500'>{dayjs(createdAt).format('HH:mm DD.MM.YY')}</p>
            {location.pathname.includes('post') && author?.username === user?.username && (
                <>
                    {isEdit && (
                        <>
                            <input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder='Описание поста'
                            />
                            <button onClick={handleUpdate}>Сохранить</button>
                        </>
                    )}
                    <button onClick={handleEdit}>{isEdit ? 'Отменить изменения' : 'Изменить'}</button>
                    {user.role !== 'MODERATOR' && <button onClick={handleDelete}>Удалить пост</button>}
                </>
            )}
            {user.role === 'MODERATOR' && <button onClick={handleDelete}>Удалить пост</button>}
        </div>
    );
};
