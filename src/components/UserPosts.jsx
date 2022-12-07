import React from 'react';
import { useSelector } from 'react-redux';
import { PostCard } from '../components/PostCard';

export const UserPosts = () => {
    const { profilePosts } = useSelector((store) => store.post);

    return (
        <div className='max-w-[728px] flex items-center flex-wrap md:gap-1'>
            {profilePosts.length > 0 ? (
                profilePosts.map((post) => <PostCard key={post.id} {...post} />)
            ) : (
                <p className='font-semibold text-2xl'>Здесь пока пусто</p>
            )}
        </div>
    );
};
