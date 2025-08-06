import { authGuard } from '@/features/auth/actions/auth-guard';
import { MemberPersonalInfoWidget } from './_ui/member-personal-info-widget';
import { MemberProfileWidget } from './_ui/member-profile-widget';
import { MemberRecordWidget } from './_ui/member-record-widget';

interface Props {
  params: Promise<{ memberId: string }>;
}
export default async function Page({ params }: Props) {
  const { memberId } = await params;
  await authGuard();

  return (
    <div className="flex min-w-0 flex-col gap-y-15 overflow-y-auto px-10 py-8">
      <div className="flex flex-col gap-y-4">
        <MemberPersonalInfoWidget memberId={memberId} />
        <MemberProfileWidget memberId={memberId} />
      </div>
      <MemberRecordWidget memberId={memberId} />
    </div>
  );
}
