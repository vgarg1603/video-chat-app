import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { login } from '../lib/api';
import toast from 'react-hot-toast';

const useLogin = () => {

    const queryClient = useQueryClient();

    const loginMutate = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success("Login successfull");
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        }
    })

    return {isPending: loginMutate.isPending, error: loginMutate.error, loginMutation: loginMutate.mutate}
}

export default useLogin