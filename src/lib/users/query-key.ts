export function getUsersQueryKey(id: number | string) {
  return ['users', String(id)];
}
