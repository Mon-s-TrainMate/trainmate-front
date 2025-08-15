import { getMemberRecordListQueryKey } from '@/lib/query-key';
import { useQuery } from '@tanstack/react-query';
import { getMemberRecordList } from '../api/get-member-record-list';

export function useMemberRecordList(memberId: string, date: string) {
  return useQuery({
    queryKey: getMemberRecordListQueryKey(memberId, date),
    queryFn: ({ queryKey }) =>
      getMemberRecordList(queryKey[1], {
        date: queryKey[4],
      }),
  });
}
