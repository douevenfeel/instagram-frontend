import React from 'react';
import { Layout } from '../components/Layout';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

export const BannedPage = () => {
    const { user } = useSelector((store) => store.user);
    return (
        <Layout classes='flex items-center flex-col'>
            <p className='font-semibold text-2xl'>Ваш аккаунт заблокирован</p>
            <p className='font-semibold text-2xl'>
                Дата блокировки: <span className='font-normal'>{dayjs(user.updatedAt).format('HH:MM DD.MM.YYYY')}</span>
            </p>
        </Layout>
    );
};
