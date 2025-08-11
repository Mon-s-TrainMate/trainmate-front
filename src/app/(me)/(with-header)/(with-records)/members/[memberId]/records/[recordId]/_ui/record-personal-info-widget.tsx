'use client';

import { useMemberProfile } from '@/features/member/hooks/use-member-profile';
import { UserAvatar } from '@/features/user/ui/user-avatar';
import { MailIcon, PhoneIcon } from 'lucide-react';

interface RecordPersonalInfoWidgetProps {
  memberId: string;
}

export function RecordPersonalInfoWidget({
  memberId,
}: RecordPersonalInfoWidgetProps) {
  const { data } = useMemberProfile(memberId);

  const infoConfigs = [
    {
      id: 'email',
      value: data?.email,
      Icon: MailIcon,
    },
    {
      id: 'phone',
      value: data?.phone,
      Icon: PhoneIcon,
    },
  ].filter((config) => config.value != null);

  return (
    <div className="shadow-sm flex flex-wrap items-center justify-center gap-6 rounded-xl bg-white p-4 @lg:justify-between @lg:p-6">
      <div className="hidden items-center gap-x-5 @3xl:flex">
        <UserAvatar src={data?.profileImage} size="lg" />
        <div className="flex-1">
          <div className="text-2xl font-semibold text-black">{data?.name}</div>
          <div className="flex items-center gap-x-7.5 text-gray-2">
            {infoConfigs.map((config) => (
              <div key={config.id} className="flex items-center gap-x-2">
                <config.Icon />
                {config.value}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center gap-x-5.5">
        <PhysicalMetric
          label="체지방량"
          value={data?.bodyFatPercentage}
          unit="%"
        />
        <div className="text-2xl font-light text-gray-4">/</div>
        <PhysicalMetric label="근골격량" value={data?.muscleMassKg} unit="kg" />
      </div>
    </div>
  );
}

interface PhysicalMetricProps {
  label: string;
  value?: number | null;
  unit: string;
}

function PhysicalMetric({ label, value, unit }: PhysicalMetricProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-1 text-xs font-light text-gray-2">{label}</div>
      <div className="flex items-end gap-2">
        <div className="text-4xl leading-none font-light text-black">
          {value ?? '--'}
        </div>
        {value && (
          <div className="text-2xl leading-none font-light text-black">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}
