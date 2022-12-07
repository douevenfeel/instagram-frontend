import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api';
import { resetUsers, setUsers } from '../store/reducers/userReducer';
import { UserCard } from './UserCard';

export const UsersModerator = () => {
    const { users } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUsers = async () => {
            await axiosInstance.get('user').then((response) => dispatch(setUsers(response?.data)));
        };
        fetchUsers();

        return () => dispatch(resetUsers());
    }, [dispatch]);

    return <div>{users.length > 0 && users.map((user) => <UserCard key={user.id} {...user} />)}</div>;
};
