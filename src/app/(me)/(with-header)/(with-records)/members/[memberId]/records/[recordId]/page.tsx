import { authGuard } from '@/features/auth/actions/auth-guard';
import { RecordPageClient } from './_ui/record-page-client';
import { RecordPersonalInfoWidget } from './_ui/record-personal-info-widget';

interface Props {
  params: Promise<{ memberId: string }>;
}

export default async function RecordPage({ params }: Props) {
  const { memberId } = await params;
  await authGuard();

  return (
    <div className="@container min-w-0 overflow-y-auto">
      <div className="flex flex-col gap-y-4 p-3 @lg:px-10 @lg:py-8">
        <RecordPersonalInfoWidget memberId={memberId} />
        <RecordPageClient memberId={memberId} />
      </div>
    </div>
  );
}
