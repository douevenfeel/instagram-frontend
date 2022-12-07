import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api';
import { PostCard } from '../components/PostCard';
import { resetEstimated, setEstimated } from '../store/reducers/postReducer';

export const UserEstimates = () => {
    const dispatch = useDispatch();
    const { estimatedPosts, fetch } = useSelector((store) => store.post);
    useEffect(() => {
        const fetchEstimatedPosts = async () => {
            await axiosInstance.get('/post/estimated').then((response) => dispatch(setEstimated(response?.data)));
        };
        fetchEstimatedPosts();

        return () => dispatch(resetEstimated());
    }, [dispatch, fetch]);

    return (
        <div className='max-w-[728px] flex items-center flex-wrap md:gap-1'>
            {estimatedPosts.length > 0 ? (
                estimatedPosts.map(
                    (estimatedPost) =>
                        !estimatedPost?.post?.user?.isBanned && (
                            <PostCard key={estimatedPost.id} {...estimatedPost.post} />
                        )
                )
            ) : (
                <p className='font-semibold text-2xl'>Здесь пока пусто</p>
            )}
        </div>
    );
};
