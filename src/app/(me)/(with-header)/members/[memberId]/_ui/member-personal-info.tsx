'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUsersMe } from '@/features/auth/hooks/use-me';
import { getUsersQueryKey } from '@/lib/users/query-key';
import { useQueryClient } from '@tanstack/react-query';
import { UserAvatar } from '@/features/user/ui/user-avatar';
import {
  CircleAlertIcon,
  MailIcon,
  PhoneIcon,
  PlusCircleIcon,
} from 'lucide-react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { updateProfile } from '../_actions/update-profile';

interface MemberPersonalInfoWidgetProps {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string | null;
  thumbnail?: string | null;
}
export function MemberPersonalInfoWidget({
  id,
  name,
  email,
  phoneNumber,
  thumbnail,
}: MemberPersonalInfoWidgetProps) {
  const { data: me } = useUsersMe();
  const isMe = me?.id === id;
  return (
    <div className="rounded-lg bg-white p-6 flex items-start gap-x-5">
      <UserAvatar src={thumbnail} size="lg" />
      <div className="flex-1">
        <div className="text-black text-2xl font-semibold">{name}</div>
        <div className="text-gray-2 flex items-center gap-x-7.5">
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
      {isMe && (
        <ProfileEditDialog
          thumbnail={thumbnail}
          name={name}
          email={email}
          phoneNumber={phoneNumber}
        />
      )}
    </div>
  );
}

type ProfileEditDialogProps = Pick<
  MemberPersonalInfoWidgetProps,
  'thumbnail' | 'name' | 'email' | 'phoneNumber'
>;
function ProfileEditDialog({
  thumbnail,
  name,
  email,
  phoneNumber,
}: ProfileEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(updateProfile, null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state?.success) {
      // Invalidate users/me cache to refresh user data
      queryClient.invalidateQueries({
        queryKey: getUsersQueryKey('me'),
      });
      setOpen(false);
    }
  }, [state?.success, queryClient]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="text">
          <PlusCircleIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={formAction} className="flex flex-col gap-y-10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-x-3 font-bold text-2xl">
              <CircleAlertIcon className="text-primary" />
              프로필 수정
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-9">
            <div className="flex gap-x-5 items-center">
              <UserAvatarWithFileInput src={thumbnail} />
              <div>
                <div className="font-semibold">{name}</div>
                <div className="flex items-center gap-x-2">
                  <MailIcon />
                  {email}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label className="text-sm">연락처</Label>
              <Input
                type="tel"
                name="phoneNumber"
                defaultValue={phoneNumber ?? ''}
                placeholder="010-0000-0000"
                className={state?.errors?.phoneNumber ? 'border-red-1' : ''}
              />
              {state?.errors?.phoneNumber && (
                <p className="text-sm text-red-1">
                  {state.errors.phoneNumber[0]}
                </p>
              )}
            </div>
          </div>
          {state?.message && !state?.success && (
            <div className="text-sm text-red-1">{state.message}</div>
          )}

          <DialogFooter className="grid grid-cols-2 gap-x-2.5">
            <Button
              type="button"
              size="lg"
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              취소하기
            </Button>
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? '저장 중...' : '편집하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface UserAvatarWithFileInputProps {
  src?: string | null;
}
function UserAvatarWithFileInput({ src }: UserAvatarWithFileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [preview, setPreview] = useState<string>();
  return (
    <label
      onClick={(e) => {
        if (preview == null) return;
        e.preventDefault();
        setPreview(undefined);
        inputRef.current.value = '';
      }}
    >
      <UserAvatar src={preview ?? src} />
      <input
        ref={inputRef}
        type="file"
        name="thumbnail"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (file != null) setPreview(URL.createObjectURL(file));
        }}
      />
    </label>
  );
}
