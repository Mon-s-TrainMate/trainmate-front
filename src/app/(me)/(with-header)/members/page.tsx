import { authGuard } from '@/features/auth/actions/auth-guard';
import { UserAvatar } from '@/features/user/ui/user-avatar';

export default async function Page() {
  await authGuard();
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center gap-x-5">
        <UserAvatar size="lg" />
        <p className="text-2xl text-gray-6">
          회원님을 선택하고
          <br />
          운동을 시작해 볼까요?
        </p>
      </div>
    </div>
  );
}
