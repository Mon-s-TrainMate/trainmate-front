import { Button } from '@/components/ui/button';
import { getMemberProfileById } from '@/features/member/api/get-member-profile-by-id';
import { getMemberRecordList } from '@/features/member/api/get-member-record-list';
import { formatDuration } from '@/lib/time/format-duration';
import { ChevronRightIcon } from 'lucide-react';
import { MemberPersonalInfo } from './_ui/member-personal-info';
import { MemberProfile } from './_ui/member-profile';
import { MemberRecordSummary } from './_ui/member-record-summary';

interface Props {
  params: Promise<{ memberId: string }>;
}
export default async function Page({ params }: Props) {
  const { memberId } = await params;
  const profile = await getMemberProfileById(memberId);
  const sets = await getMemberRecordList(memberId);
  const totalDurationSec = sets.reduce(
    (acc, set) => acc + set.totalDurationSec,
    0
  );
  const caloriesBurned = sets.reduce((acc, set) => acc + set.caloriesBurned, 0);

  return (
    <div className="px-10 py-8 min-w-0 flex flex-col gap-y-15 overflow-y-auto">
      <div className="flex flex-col gap-y-4">
        <MemberPersonalInfo
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
      <div className="flex flex-col gap-y-5.5">
        <div className="flex items-center justify-between tracking-[-1.18px] text-gray-7 font-light">
          <div>날짜</div>
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-4">
              time
              <div className="text-2xl">{formatDuration(totalDurationSec)}</div>
            </div>
            <div className="flex items-center gap-x-4">
              total
              <div className="flex items-end gap-x-2">
                <div className="text-2xl">
                  {caloriesBurned.toLocaleString()}
                </div>
                kcal
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          {sets.map((set) => (
            <MemberRecordSummary key={set.id} {...set} />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center p-6">
          <Button className="max-w-80 w-full">
            운동 관리하기
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
