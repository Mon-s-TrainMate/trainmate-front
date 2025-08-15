import { getMemberRecordQueryKey } from '@/lib/query-key';
import { useQuery } from '@tanstack/react-query';
import { getMemberRecord } from '../api/get-member-record';

export function useMemberRecord(memberId: string, recordId: string) {
  return useQuery({
    queryKey: getMemberRecordQueryKey(memberId, recordId),
    queryFn: async ({ queryKey }) => {
      const memberId = queryKey[1];
      const recordId = queryKey[3];
      if (recordId === 'new') return null;
      return await getMemberRecord(memberId, recordId);
    },
  });
}
