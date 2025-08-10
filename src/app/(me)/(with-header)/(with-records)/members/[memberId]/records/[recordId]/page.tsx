import { authGuard } from '@/features/auth/actions/auth-guard';
import { RecordPersonalInfoWidget } from './_ui/record-personal-info-widget';
import { RecordPageClient } from './_ui/record-page-client';

interface Props {
  params: Promise<{ memberId: string }>;
}

export default async function RecordPage({ params }: Props) {
  const { memberId } = await params;
  await authGuard();

  return (
    <div className="flex min-w-0 flex-col gap-y-4 overflow-y-auto px-10 py-8">
      <RecordPersonalInfoWidget memberId={memberId} />
      <RecordPageClient memberId={memberId} />
    </div>
  );
}
