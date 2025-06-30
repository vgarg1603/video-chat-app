import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { logout } from '../lib/api'

const useLogout = () => {

    const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: logout,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['authUser']});
    }
  })

  return {logoutMutation: mutate, isPending};
}

export default useLogout