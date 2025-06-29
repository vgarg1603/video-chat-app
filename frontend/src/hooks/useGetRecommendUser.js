import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getRecommendedFriends } from '../lib/api';

const useGetRecommendUser = () => {
  
    const friendIds = useQuery({
    queryKey: ['recommendedUsers'],
    queryFn: getRecommendedFriends,
  });

  return {recommendedUsers: friendIds.data?.recommendedUsers || [], loadingUsers: friendIds.isLoading}

}

export default useGetRecommendUser