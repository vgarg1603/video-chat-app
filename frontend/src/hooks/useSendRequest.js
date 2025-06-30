import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { sendRequest } from '../lib/api';
import toast from 'react-hot-toast';

const useSendRequest = () => {

    const queryClient = useQueryClient();
  
    const { mutate, isPending, error } = useMutation({
        mutationFn: sendRequest,
        onSuccess: () => {
            toast.success('Friend request sent successfully!');
            queryClient.invalidateQueries({ queryKey: ['outgoingRequests'] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to send friend request');
            console.error('Send request error:', error);
        }
    })

    return {sendRequestMutation: mutate, isPending, error};
}

export default useSendRequest