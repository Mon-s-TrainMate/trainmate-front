import { getMyProfileQueryKey, getUsersQueryKey } from '@/lib/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signOut } from '../server-session';

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    async onSuccess() {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getUsersQueryKey('me'),
        }),
        queryClient.invalidateQueries({
          queryKey: getMyProfileQueryKey(),
        }),
      ]);
    },
  });
}
