import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getFriends } from '../lib/api'

const useGetFriends = () => {
  const friendIds = useQuery({
    queryKey: ['friends'],
    queryFn: getFriends,
  });

  return {
    friends: friendIds.data?.friends || [], 
    loadingFriends: friendIds.isLoading,
    error: friendIds.error
  }
}

export default useGetFriends