'use client';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useMemberList } from '@/features/member/hooks/use-member-list';
import { useMyProfile } from '@/features/member/hooks/use-my-profile';
import { useDepth } from '@/lib/hooks/use-depth';
import { useIsSm } from '@/lib/hooks/use-is-mobile';
import { UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MemberItem } from './member-item';
import { Member } from './types';

export function Sidebar() {
  const { data: members } = useMemberList();
  const isSm = useIsSm();
  return (
    <aside className="w-full bg-white sm:w-100">
      {isSm && (
        <header className="flex items-center border-b p-6">
          <MemberListHeader count={members?.length ?? 0} />
        </header>
      )}
      <MemberListContent members={members} />
    </aside>
  );
}

interface MemberListHeader {
  count: number;
}
function MemberListHeader({ count }: MemberListHeader) {
  return (
    <div className="flex flex-1 items-center gap-x-2.5">
      <div className="text-2xl font-bold">회원목록</div>
      <div className="flex items-center gap-x-1 rounded-full bg-gray-4 px-2 py-0.5 text-[0.625rem] text-black">
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
  const { data: user } = useMyProfile();
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

interface MemberLinkProps {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
  recentRecordTime?: Date;
}
function MemberLink(props: MemberLinkProps) {
  const pathname = usePathname();
  const active = pathname.startsWith(`/members/${props.id}`);
  const { next } = useDepth();
  return (
    <Link
      href={`/members/${props.id}`}
      onClick={() => {
        next();
      }}
    >
      <MemberItem {...props} active={active} />
    </Link>
  );
}
