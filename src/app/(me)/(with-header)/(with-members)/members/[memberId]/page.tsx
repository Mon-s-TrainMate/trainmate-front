import { AuthGuard } from '@/features/auth/ui/auth-guard';
import { MemberPersonalInfoWidget } from './_ui/member-personal-info-widget';
import { MemberProfileWidget } from './_ui/member-profile-widget';
import { MemberRecordWidget } from './_ui/member-record-widget';

interface Props {
  params: Promise<{ memberId: string }>;
}
export default async function Page({ params }: Props) {
  const { memberId } = await params;

  return (
    <AuthGuard>
      <div className="@container min-w-0 overflow-y-auto">
        <div className="flex flex-col gap-y-15 p-3 @lg:px-10 @lg:py-8">
          <div className="flex flex-col gap-y-4">
            <MemberPersonalInfoWidget memberId={memberId} />
            <MemberProfileWidget memberId={memberId} />
          </div>
          <MemberRecordWidget memberId={memberId} />
        </div>
      </div>
    </AuthGuard>
  );
}
