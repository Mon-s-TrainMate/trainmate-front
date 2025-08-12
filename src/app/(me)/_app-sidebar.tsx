'use client';

import { UserAvatar } from '@/features/user/ui/user-avatar';
import {
  CalendarIcon,
  MessageSquareMoreIcon,
  SettingsIcon,
  UserRoundIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ElementType } from 'react';

// Menu items.
const items = [
  {
    id: 0,
    href: '/members',
    Icon: UserRoundIcon,
  },
  {
    id: 1,
    Icon: CalendarIcon,
  },
  {
    id: 2,
    Icon: MessageSquareMoreIcon,
  },
];

export function AppSidebar() {
  return (
    <aside className="sticky top-0 z-50 grid w-22 grid-rows-[max-content_1fr_max-content] bg-white shadow-sidebar">
      <header className="flex flex-col items-center gap-y-4 px-4 pt-6">
        <Link href="/">
          <UserAvatar />
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
      <footer className="pb-3">
        <NavLink href="/settings" Icon={SettingsIcon} />
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
  if (href == null) {
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
