import { getMemberProfileQueryKey } from '@/lib/users/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMemberProfile } from '../api/update-member-profile';

export function useUpdateMemberProfile(memberId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMemberProfile,
    async onSuccess(data) {
      if (data.success) {
        await queryClient.invalidateQueries({
          queryKey: getMemberProfileQueryKey(memberId),
        });
      }
    },
  });
}
