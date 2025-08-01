import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/features/user/ui/user-avatar';
import { MailIcon, PhoneIcon, PlusCircleIcon } from 'lucide-react';

interface MemberInfoPersonalProps {
  name: string;
  email: string;
  phoneNumber?: string | null;
  thumbnail?: string | null;
  onClick?: () => void;
}
export function MemberPersonalInfo({
  name,
  email,
  phoneNumber,
  thumbnail,
  onClick,
}: MemberInfoPersonalProps) {
  return (
    <div className="rounded-lg bg-white p-6 flex items-start gap-x-5">
      <UserAvatar src={thumbnail} size="lg" />
      <div className="flex-1">
        <div className="text-gray-8 text-2xl font-semibold">{name}</div>
        <div className="text-gray-5 flex items-center gap-x-7.5">
          {email && (
            <div className="flex items-center gap-x-2">
              <MailIcon />
              {email}
            </div>
          )}
          {phoneNumber && (
            <div className="flex items-center gap-x-2">
              <PhoneIcon />
              {phoneNumber}
            </div>
          )}
        </div>
      </div>
      <div>
        <Button size="icon" variant="ghost" onClick={onClick}>
          <PlusCircleIcon />
        </Button>
      </div>
    </div>
  );
}
