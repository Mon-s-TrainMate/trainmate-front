import { authGuard } from '@/features/auth/actions/auth-guard';
import { getMemberProfileById } from '@/features/member/api/get-member-profile-by-id';
import { MemberPersonalInfoWidget } from './_ui/member-personal-info';
import { MemberProfile } from './_ui/member-profile';
import { MemberRecordWidget } from './_ui/member-record-widget';

interface Props {
  params: Promise<{ memberId: string }>;
}
export default async function Page({ params }: Props) {
  const { memberId } = await params;
  await authGuard();
  const profile = await getMemberProfileById(memberId);

  return (
    <div className="flex min-w-0 flex-col gap-y-15 overflow-y-auto px-10 py-8">
      <div className="flex flex-col gap-y-4">
        <MemberPersonalInfoWidget
          id={profile.id}
          thumbnail={profile.profileImage}
          name={profile.name}
          email={profile.email}
        />
        <MemberProfile
          heightCm={profile.heightCm}
          weightKg={profile.weightKg}
          bodyFatPercentage={profile.bodyFatPercentage}
          muscleMassKg={profile.muscleMassKg}
        />
      </div>
      <MemberRecordWidget memberId={memberId} />
    </div>
  );
}
