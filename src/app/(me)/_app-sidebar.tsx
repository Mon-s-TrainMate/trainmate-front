'use client';

import { UserAvatar } from '@/features/user/ui/user-avatar';
import {
  CalendarIcon,
  FileTextIcon,
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
    href: '/records',
    Icon: FileTextIcon,
  },
  {
    id: 2,
    Icon: CalendarIcon,
  },
  {
    id: 3,
    Icon: MessageSquareMoreIcon,
  },
];

export function AppSidebar() {
  return (
    <aside className="w-22 shadow-sidebar grid grid-rows-[max-content_1fr_max-content] z-50 bg-white">
      <header className="pt-6 px-4 flex flex-col gap-y-4 items-center">
        <Link href="/">
          <UserAvatar />
        </Link>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="w-10 h-0.5 bg-gray-1 rounded-full"
        ></div>
      </header>
      <section className="py-8.25 flex flex-col gap-y-2">
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
      <button className="appearance-none flex justify-center">
        <div className="flex items-center justify-center size-12 rounded-full text-gray-5">
          <Icon />
        </div>
      </button>
    );
  }
  return (
    <Link
      href={href}
      className="relative flex justify-center group"
      data-active={pathname.startsWith(href)}
    >
      <div
        className="hidden group-data-[active=true]:block absolute size-2 bg-primary right-full top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden
      ></div>
      <div className="flex items-center justify-center size-12 rounded-full text-gray-8 group-data-[active=true]:bg-primary-foreground group-data-[active=true]:text-primary">
        <Icon />
      </div>
    </Link>
  );
}
