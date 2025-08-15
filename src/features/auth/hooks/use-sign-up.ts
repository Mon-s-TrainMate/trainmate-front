import { getMyProfileQueryKey, getUsersQueryKey } from '@/lib/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUpAction } from '../actions/sign-up-action';

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUpAction,
    async onSuccess(data) {
      if (data.success) {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: getUsersQueryKey('me'),
          }),
          queryClient.invalidateQueries({
            queryKey: getMyProfileQueryKey(),
          }),
        ]);
      }
    },
  });
}
