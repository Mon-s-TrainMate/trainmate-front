export function getUsersQueryKey(id: number | string) {
  return ['users', String(id)];
}

export function getMemberListQueryKey() {
  return ['members'];
}

export function getMemberRecordListQueryKey(memberId: string, date?: string) {
  const queryDate = date ?? new Date().toISOString().split('T')[0];
  return ['members', memberId, 'records', queryDate] as const;
}

export function getMemberProfileQueryKey(memberId: string) {
  return ['members', memberId, 'profile'] as const;
}
