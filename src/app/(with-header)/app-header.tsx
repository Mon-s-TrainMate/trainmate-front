import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AppHeader() {
  return (
    <div className="border-b pl-22 pr-7.5 mt-4 flex justify-between items-center">
      <Catchphrase />
      <div className="flex items-center gap-x-7">
        <Link href="/auth/sign-up">
          <Button variant="ghost">회원가입</Button>
        </Link>
        <Link href="/auth/sign-in">
          <Button>로그인하기</Button>
        </Link>
      </div>
    </div>
  );
}

function Catchphrase() {
  return (
    <div className="text-[2.125rem]">
      Let&apos;s burn{' '}
      <span className="text-[3.375rem] text-primary">Calories!</span>
    </div>
  );
}
