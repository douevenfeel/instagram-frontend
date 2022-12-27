import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export const UserCard = (props) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/user/${props.username}`);
    };
    return (
        <div className='py-6 px-6 border rounded-md my-4 w-1/2 min-w-[340px] cursor-pointer' onClick={handleNavigate}>
            <p>
                <strong>ID: </strong>
                {props.id}
            </p>
            <p>
                <strong>Имя пользователя: </strong>
                {props.username}
            </p>
            <p>
                <strong>Забанен: </strong>
                {props.isBanned ? 'да' : 'нет'}
            </p>
            {props.isBanned && (
                <p>
                    <strong>Дата блокировки: </strong>
                    {dayjs(props.updatedAt).format('HH:mm DD.MM.YYYY')}
                </p>
            )}
        </div>
    );
};
