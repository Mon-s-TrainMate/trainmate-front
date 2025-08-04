'use client';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUsersMe } from '@/features/auth/hooks/use-me';
import { useMemberList } from '@/features/member/hooks/use-member-list';
import { UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MemberItem } from './member-item';
import { Member } from './types';

export function Sidebar() {
  const { data: members } = useMemberList();
  return (
    <aside className="bg-white">
      <header className="flex items-center p-6 border-b">
        <MemberListHeader count={members?.length ?? 0} />
      </header>
      <MemberListContent members={members} />
    </aside>
  );
}

interface MemberListHeader {
  count: number;
}
function MemberListHeader({ count }: MemberListHeader) {
  return (
    <div className="flex-1 gap-x-2.5 flex items-center">
      <div className="text-2xl font-bold">회원목록</div>
      <div className="text-[0.625rem] text-black bg-gray-4 flex items-center py-0.5 px-2 gap-x-1 rounded-full">
        <UserRoundIcon size="0.625rem" />
        {count}
      </div>
    </div>
  );
}

interface MemberContentProps {
  members?: Member[];
}
function MemberListContent({ members }: MemberContentProps) {
  const { data: user } = useUsersMe();
  const [keyword, setKeyword] = useState('');
  const filteredMembers =
    members?.filter((member) => member.name.includes(keyword)) ?? [];
  return (
    <div className="flex flex-col gap-y-3 px-3 py-6">
      <div className="mx-2.5">
        <Input
          inputSize="sm"
          placeholder="회원 이름을 검색해보세요."
          value={keyword}
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
      </div>
      {user != null && <MemberLink {...user} />}
      <Separator />
      {filteredMembers.map((member) => (
        <MemberLink key={member.email} {...member} />
      ))}
    </div>
  );
}

type MemberLinkProps = Member;
function MemberLink(props: MemberLinkProps) {
  const pathname = usePathname();
  const active = pathname.startsWith(`/members/${props.id}`);
  return (
    <Link href={`/members/${props.id}`}>
      <MemberItem {...props} active={active} />
    </Link>
  );
}
