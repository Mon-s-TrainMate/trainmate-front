'use client';

import { BrandCatchphrase } from '@/components/ui/brand-catchphrase';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ClientUser } from '@/features/auth/actions/me';
import { useUsersMe } from '@/features/auth/hooks/use-me';
import { UserAvatar } from '@/features/user/ui/user-avatar';
import { BellIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppHeader() {
  const { data: user } = useUsersMe();
  const pathname = usePathname();
  return (
    <div className="border-b pl-22 pr-7.5 pt-4 flex items-center bg-white">
      {pathname === '/' && <BrandCatchphrase />}
      {user != null ? <SignedInActions user={user} /> : <AnonymousActions />}
    </div>
  );
}

interface SignedInActionsProps {
  user: ClientUser;
}
function SignedInActions({ user }: SignedInActionsProps) {
  return (
    <div className="ml-auto flex items-center gap-x-9">
      <div className="flex items-center gap-x-4">
        <UserAvatar size="xs" />
        <span className="text-xl break-keep text-black">{user.name}</span>
        <Separator
          orientation="vertical"
          className="min-h-3 rounded-full bg-gray-3"
        />
        <span className="text-gray-2">
          {user.userType === 'trainer' ? '트레이너' : '회원'}
        </span>
      </div>
      <button className="flex items-center justify-center text-black">
        <BellIcon strokeWidth={1} />
      </button>
    </div>
  );
}

function AnonymousActions() {
  return (
    <div className="ml-auto flex items-center gap-x-7">
      <Link href="/auth/sign-up">
        <Button variant="text">회원가입</Button>
      </Link>
      <Link href="/auth/sign-in">
        <Button>로그인하기</Button>
      </Link>
    </div>
  );
}
