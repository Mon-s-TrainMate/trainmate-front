import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlusCircleIcon } from 'lucide-react';

interface MemberProfileProps {
  heightCm?: number | null;
  weightKg?: number | null;
  bodyFatPercentage?: number | null;
  muscleMassKg?: number | null;
  onClick?: () => void;
}
export function MemberProfile({
  heightCm,
  weightKg,
  bodyFatPercentage,
  muscleMassKg,
  onClick,
}: MemberProfileProps) {
  return (
    <div className="rounded-lg bg-white p-6 flex items-start gap-x-5">
      <div className="flex-1 flex items-center gap-x-12.5">
        <Value title="키" value={heightCm} unit="cm" />
        <VerticalSeparator />
        <Value title="몸무게" value={weightKg} unit="kg" />
        <VerticalSeparator />
        <Value title="체지방량" value={bodyFatPercentage} unit="%" />
        <VerticalSeparator />
        <Value title="근골격량" value={muscleMassKg} unit="kg" />
      </div>
      <div>
        <Button size="icon" variant="text" onClick={onClick}>
          <PlusCircleIcon />
        </Button>
      </div>
    </div>
  );
}

interface ValueProps {
  title: string;
  value: number | null | undefined;
  unit: string;
}
function Value({ title, value, unit }: ValueProps) {
  return (
    <div className="grid font-light tracking-[-1.18px]">
      <div className="text-gray-5 text-xs">{title}</div>
      {value != null ? (
        <div className="text-gray-8 text-2xl flex items-end gap-x-2">
          <span className="text-4xl">{value}</span>
          {unit}
        </div>
      ) : (
        <div className="text-gray-5 flex items-center justify-center w-full h-full min-w-18 min-h-10">
          미입력
        </div>
      )}
    </div>
  );
}

function VerticalSeparator() {
  return (
    <Separator
      orientation="vertical"
      className="min-h-8 min-w-0.5 rounded-full"
    />
  );
}
