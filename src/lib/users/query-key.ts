export function getUsersQueryKey(id: number | string) {
  return ['users', String(id)];
}

export function getMemberListQueryKey() {
  return ['members'];
}

export function getMemberRecordListQueryKey(memberId: string, date: string) {
  return ['members', memberId, 'records', date] as const;
}
