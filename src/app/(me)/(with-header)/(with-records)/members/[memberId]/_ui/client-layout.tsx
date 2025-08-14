'use client';

import { DepthProvider, useDepth } from '@/lib/hooks/use-depth';
import { useIsSm } from '@/lib/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { RecordDateProvider } from '../_hooks/use-record-date';
import { Sidebar } from './sidebar';
import { RecordSidebarHeader } from './sidebar-header';

interface LayoutProps {
  memberId: string;
  children?: ReactNode;
}
export default function ClientLayout(props: LayoutProps) {
  return (
    <DepthProvider max={1}>
      <View {...props} />
    </DepthProvider>
  );
}

function View({ memberId, children }: LayoutProps) {
  const isSm = useIsSm();
  const { visible } = useDepth(isSm);
  return (
    <div
      className={cn('grid h-full min-h-0', {
        'grid-cols-[max-content_1fr]': isSm,
        'grid-rows-[max-content_1fr]': !isSm,
      })}
    >
      <RecordDateProvider>
        {isSm || <RecordSidebarHeader memberId={memberId} />}
        {visible(0) && (
          <div
            className={cn('grid h-full min-h-0', {
              'grid-rows-[max-content_1fr]': isSm,
            })}
          >
            {isSm && <RecordSidebarHeader memberId={memberId} />}
            <Sidebar memberId={memberId} />
          </div>
        )}
      </RecordDateProvider>
      {visible(1) && children}
    </div>
  );
}
