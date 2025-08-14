'use client';

import { BrandCatchphrase } from '@/components/ui/brand-catchphrase';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useMyProfile } from '@/features/member/hooks/use-my-profile';
import { UserAvatar } from '@/features/user/ui/user-avatar';
import { BellIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppHeader() {
  const { data: user } = useMyProfile();
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-3 p-4 pt-9 sm:flex-row sm:items-center sm:border-b sm:bg-white sm:pl-8">
      {pathname === '/' && <BrandCatchphrase />}
      {user != null ? (
        <SignedInActions
          name={user.name}
          userType={user.userType}
          profileImage={user.profileImage}
        />
      ) : (
        <AnonymousActions />
      )}
    </div>
  );
}

interface SignedInActionsProps {
  name: string;
  userType: string;
  profileImage?: string;
}
function SignedInActions(props: SignedInActionsProps) {
  return (
    <div className="ml-auto flex items-center gap-x-9">
      <div className="flex items-center gap-x-4">
        <UserAvatar size="xs" src={props.profileImage} />
        <span className="text-xl break-keep text-black">{props.name}</span>
        <Separator
          orientation="vertical"
          className="min-h-3 rounded-full bg-gray-3"
        />
        <span className="text-gray-2">
          {props.userType === 'trainer' ? '트레이너' : '회원'}
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
    <div className="flex flex-col gap-x-7 sm:ml-auto sm:flex-row sm:items-center">
      <Link href="/auth/sign-up" className="hidden sm:block">
        <Button variant="text">회원가입</Button>
      </Link>
      <Link href="/auth/sign-in" className="w-full">
        <Button>로그인하기</Button>
      </Link>
    </div>
  );
}
