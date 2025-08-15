import { getMemberProfileQueryKey } from '@/lib/query-key';
import { useQuery } from '@tanstack/react-query';
import { getMemberProfileById } from '../api/get-member-profile-by-id';

export function useMemberProfile(memberId: string) {
  return useQuery({
    queryKey: getMemberProfileQueryKey(memberId),
    queryFn: ({ queryKey }) => getMemberProfileById(queryKey[1]),
  });
}
