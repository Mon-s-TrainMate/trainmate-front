import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/features/user/ui/user-avatar';
import Link from 'next/link';

export function GreetingStep() {
  return (
    <div>
      <UserAvatar size="xl" className="mx-auto mb-11" />
      <p className="mb-20 text-center text-[2.125rem] text-balance break-keep">
        <span className="font-semibold text-primary">TrainMate</span>의 멤버가
        된 것을
        <br /> 환영합니다!
      </p>
      <div className="grid grid-cols-2 gap-x-3.5">
        <Button
          variant="secondary"
          asChild
          className="border-primary text-primary"
        >
          <Link href="/profile">나의 데이터 등록하기</Link>
        </Button>
        <Button asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
