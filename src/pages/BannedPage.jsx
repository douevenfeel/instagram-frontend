import React from 'react';
import { Layout } from '../components/Layout';

export const BannedPage = () => {
    return (
        <Layout classes='flex justify-center'>
            <p className='font-semibold text-2xl'>Ваш аккаунт забанен</p>
        </Layout>
    );
};
