import { getMemberListQueryKey } from '@/lib/users/query-key';
import { useQuery } from '@tanstack/react-query';
import { getMemberList } from '../api/get-member-list';

export function useMemberList() {
  return useQuery({
    queryKey: getMemberListQueryKey(),
    queryFn: getMemberList,
  });
}
