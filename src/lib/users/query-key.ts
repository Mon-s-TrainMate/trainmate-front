export function getUsersQueryKey(id: number | string) {
  return ['users', String(id)];
}

export function getMemberListQueryKey() {
  return ['members'];
}

export function getMemberRecordListQueryKey(memberId: string, date: string) {
  return ['members', memberId, 'records', date] as const;
}

export function getMemberProfileQueryKey(memberId: string) {
  return ['members', memberId, 'profile'] as const;
}
