'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useMyProfile } from '@/features/member/hooks/use-my-profile';
import { UserAvatar } from '@/features/user/ui/user-avatar';
import {
  CalendarIcon,
  MessageSquareMoreIcon,
  SettingsIcon,
  UserRoundIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ElementType, useState } from 'react';

const items = [
  { id: 0, href: '/members', Icon: UserRoundIcon },
  { id: 1, Icon: CalendarIcon },
  { id: 2, Icon: MessageSquareMoreIcon },
];

export function AppSidebar() {
  const { data: user } = useMyProfile();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <aside className="sticky top-0 z-50 grid w-22 grid-rows-[max-content_1fr_max-content] overflow-clip bg-white shadow-sidebar">
      <header className="flex flex-col items-center gap-y-4 px-4 pt-6">
        <Link href="/">
          <UserAvatar src={user?.profileImage} />
        </Link>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="h-0.5 w-10 rounded-full bg-gray-4"
        ></div>
      </header>

      <section className="flex flex-col gap-y-2 py-8.25">
        {items.map((item) => (
          <NavLink key={item.id} {...item} />
        ))}
      </section>

      <footer className="relative mb-3 flex justify-center">
        <Popover open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <PopoverTrigger
            className={`flex size-12 items-center justify-center rounded-full hover:border-main-5 hover:bg-main-5 ${
              isSettingsOpen ? 'bg-main-5 text-main-2' : 'bg-white text-black'
            }`}
            data-active={isSettingsOpen}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <SettingsIcon className="strokeWidth={1} size-6" />
            {isSettingsOpen && (
              <span className="absolute top-1/2 right-full size-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary group-data-[active=true]:block" />
            )}
          </PopoverTrigger>
          <PopoverContent
            side="right"
            sideOffset={36}
            align="start"
            collisionPadding={24}
            className="flex flex-col gap-4 rounded-lg p-4"
          >
            <div className="flex flex-col items-center gap-3">
              <UserAvatar />
              <p className="font-semibold text-main-2">버전정보: v0.0.1</p>
            </div>
            <Separator />
            <Button
              variant="text"
              className="underline"
              onClick={() => setIsSettingsOpen(false)}
            >
              로그아웃
            </Button>
          </PopoverContent>
        </Popover>
      </footer>
    </aside>
  );
}

interface NavLinkProps {
  href?: string;
  Icon: ElementType;
}

function NavLink({ href, Icon }: NavLinkProps) {
  const pathname = usePathname();

  if (!href) {
    return (
      <button className="flex appearance-none justify-center">
        <div className="flex size-12 items-center justify-center rounded-full text-gray-2">
          <Icon />
        </div>
      </button>
    );
  }
  return (
    <Link
      href={href}
      className="group relative flex justify-center"
      data-active={pathname.startsWith(href)}
    >
      <div
        className="absolute top-1/2 right-full hidden size-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary group-data-[active=true]:block"
        aria-hidden
      ></div>
      <div className="flex size-12 items-center justify-center rounded-full text-black group-data-[active=true]:bg-primary-foreground group-data-[active=true]:text-primary">
        <Icon />
      </div>
    </Link>
  );
}
