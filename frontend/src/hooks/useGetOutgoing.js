import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getOutgoingRequest } from '../lib/api';

const useGetOutgoing = () => {
  
    const friendIds = useQuery({
    queryKey: ['outgoingRequests'],
    queryFn: getOutgoingRequest,
  });

  return {outgoingFriendReqs: friendIds.data?.outgoingRequestsPending || [], loadingOutgoingFriendsIds: friendIds.isLoading}
}

export default useGetOutgoing