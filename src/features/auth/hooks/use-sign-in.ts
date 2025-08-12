import { getUsersQueryKey } from '@/lib/users/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInAction } from '../actions/sign-in-action';

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInAction,
    async onSuccess(data) {
      if (data.success) {
        await queryClient.invalidateQueries({
          queryKey: getUsersQueryKey('me'),
        });
      }
    },
  });
}
