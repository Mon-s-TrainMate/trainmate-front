import { formatISO } from 'date-fns';

export function getUsersQueryKey(id: number | string) {
  return ['users', String(id)];
}

export function getMemberListQueryKey() {
  return ['members'];
}

export function getMemberRecordListQueryKey(memberId: string, date?: string) {
  const queryDate = date ?? formatISO(new Date(), { representation: 'date' });
  return ['members', memberId, 'records', '?date', queryDate] as const;
}

export function getEntireMemberRecordListQueryKey(memberId: string) {
  return ['members', memberId, 'records'] as const;
}

export function getMemberRecordQueryKey(memberId: string, recordId: string) {
  return ['members', memberId, 'records', recordId] as const;
}

export function getMemberProfileQueryKey(memberId: string) {
  return ['members', memberId, 'profile'] as const;
}

export function getMyProfileQueryKey() {
  return ['my', 'profile'] as const;
}
