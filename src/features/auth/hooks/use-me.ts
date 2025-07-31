import { getUsersQueryKey } from '@/lib/users/query-key';
import { useQuery } from '@tanstack/react-query';
import { getUsersMe } from '../actions/me';

export function useUsersMe() {
  return useQuery({
    queryKey: getUsersQueryKey('me'),
    queryFn: getUsersMe,
  });
}
