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
    <div className="flex items-start gap-x-5 rounded-lg bg-white p-6">
      <div className="flex flex-1 items-center gap-x-12.5">
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
      <div className="text-xs text-gray-2">{title}</div>
      {value != null ? (
        <div className="flex items-end gap-x-2 text-2xl text-black">
          <span className="text-4xl">{value}</span>
          {unit}
        </div>
      ) : (
        <div className="flex h-full min-h-10 w-full min-w-18 items-center justify-center text-gray-2">
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
