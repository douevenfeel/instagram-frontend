import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PostCard = ({ id, photo, description }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/post/${id}`);
    };
    return (
        <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${photo}`}
            className='max-w-[240px] max-h-[240px] w-[50vw] h-[50vw] object-cover cursor-pointer border md:border-none'
            alt={description}
            onClick={handleClick}
        />
    );
};
