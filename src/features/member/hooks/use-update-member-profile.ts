import { getMemberProfileQueryKey } from '@/lib/users/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMemberProfile } from '../api/update-member-profile';

interface UseUpdateMemberProfileOptions {
  memberId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useUpdateMemberProfile({
  memberId,
  onSuccess,
  onError,
}: UseUpdateMemberProfileOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMemberProfile,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: getMemberProfileQueryKey(memberId),
      });

      onSuccess?.();
    },
    onError,
  });
}
