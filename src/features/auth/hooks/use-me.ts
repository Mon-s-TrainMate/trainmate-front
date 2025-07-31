import { useQuery } from '@tanstack/react-query';
import { getUsersMe } from '../actions/me';
import { getUsersQueryKey } from '@/lib/users/query-key';

export function useMe() {
  return useQuery({
    queryKey: getUsersQueryKey('me'),
    queryFn: getUsersMe,
  });
}
