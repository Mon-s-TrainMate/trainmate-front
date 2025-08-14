'use client';

import { Button } from '@/components/ui/button';
import { useMemberList } from '@/features/member/hooks/use-member-list';
import { DepthProvider, useDepth } from '@/lib/hooks/use-depth';
import { useIsSm } from '@/lib/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, UserRoundIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Sidebar } from './_ui/sidebar';

interface LayoutProps {
  children?: ReactNode;
}
export default function Layout(props: LayoutProps) {
  return (
    <DepthProvider max={1}>
      <View {...props} />
    </DepthProvider>
  );
}

function View({ children }: LayoutProps) {
  const isSm = useIsSm();
  const { visible } = useDepth(isSm);

  return (
    <div
      className={cn('grid h-full min-h-0', {
        'grid-cols-[max-content_1fr]': isSm,
        'grid-rows-[max-content_1fr]': !isSm,
      })}
    >
      {isSm || <MobileHeader />}
      {visible(0) && <Sidebar />}
      {visible(1) && children}
    </div>
  );
}

function MobileHeader() {
  const { depth, visible, prev } = useDepth();
  const router = useRouter();
  const { data: members } = useMemberList();
  return (
    <header className="flex items-center border-b bg-white p-6">
      <div className="flex flex-1 items-center gap-x-2.5">
        <Button
          variant="icon"
          size="icon"
          onClick={() => {
            if (depth === 0) router.back();
            else prev();
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <div className="text-2xl font-bold">
          {visible(0) && '회원목록'}
          {visible(1) && '회원 기록'}
        </div>
        <div className="flex items-center gap-x-1 rounded-full bg-gray-4 px-2 py-0.5 text-[0.625rem] text-black">
          <UserRoundIcon size="0.625rem" />
          {members?.length ?? 0}
        </div>
      </div>
    </header>
  );
}
