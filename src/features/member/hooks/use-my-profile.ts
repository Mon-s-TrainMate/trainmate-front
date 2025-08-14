import { getMyProfileQueryKey } from '@/lib/users/query-key';
import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '../api/get-my-profile';

export function useMyProfile() {
  return useQuery({
    queryKey: getMyProfileQueryKey(),
    queryFn: getMyProfile,
  });
}
