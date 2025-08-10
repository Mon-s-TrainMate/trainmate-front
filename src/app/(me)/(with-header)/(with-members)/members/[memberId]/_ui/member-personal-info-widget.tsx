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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUsersMe } from '@/features/auth/hooks/use-me';
import { updateMemberProfile } from '@/features/member/api/update-member-profile';
import { useMemberProfile } from '@/features/member/hooks/use-member-profile';
import { UserAvatar } from '@/features/user/ui/user-avatar';
import { getMemberProfileQueryKey } from '@/lib/users/query-key';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  CircleAlertIcon,
  MailIcon,
  PhoneIcon,
  PlusCircleIcon,
} from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { updatingProfileSchema } from '../schema';

interface MemberPersonalInfoWidgetProps {
  memberId: string;
}
export function MemberPersonalInfoWidget({
  memberId,
}: MemberPersonalInfoWidgetProps) {
  const { data: me } = useUsersMe();
  const { data } = useMemberProfile(memberId);
  const isMe = me?.id === data?.id;
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
    <div className="flex items-start gap-x-5 rounded-lg bg-white p-6">
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
      {isMe && <ProfileEditDialog memberId={memberId} />}
    </div>
  );
}

interface ProfileEditDialogProps {
  memberId: string;
}
function ProfileEditDialog({ memberId }: ProfileEditDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="text">
          <PlusCircleIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogForm memberId={memberId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

interface DialogFormProps {
  memberId: string;
  setOpen: (open: boolean) => void;
}
function DialogForm({ memberId, setOpen }: DialogFormProps) {
  const { data } = useMemberProfile(memberId);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(updatingProfileSchema),
    defaultValues: {
      profile_image: undefined,
      phone: data?.phone ?? '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          // TODO: upload profile image
          await updateMemberProfile({
            phone: values.phone,
          });
          await queryClient.invalidateQueries({
            queryKey: getMemberProfileQueryKey(memberId),
          });
          setOpen(false);
        })}
        className="flex flex-col gap-y-10"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-3 text-2xl font-bold">
            <CircleAlertIcon className="text-primary" />
            프로필 수정
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-9">
          <FormField
            control={form.control}
            name="profile_image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-x-5">
                    <UserAvatarWithFileInput
                      {...field}
                      profileImage={data?.profileImage}
                    />
                    <div>
                      <div className="font-semibold">{data?.name}</div>
                      <div className="flex items-center gap-x-2">
                        <MailIcon />
                        {data?.email}
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2">
                <FormLabel className="text-sm">연락처</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="010-0000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="grid grid-cols-2 gap-x-2.5">
          <Button
            type="button"
            size="lg"
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={form.formState.disabled}
          >
            취소하기
          </Button>
          <Button type="submit" size="lg" disabled={form.formState.disabled}>
            편집하기
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

type UserAvatarWithFileInputProps = {
  profileImage?: string | null;
} & ControllerRenderProps<
  {
    profile_image?: File;
  },
  'profile_image'
>;
function UserAvatarWithFileInput(props: UserAvatarWithFileInputProps) {
  const [preview, setPreview] = useState<string>();
  return (
    <label
      onClick={(e) => {
        if (preview == null) return;
        e.preventDefault();
        setPreview(undefined);
        props.onChange(undefined);
      }}
    >
      <UserAvatar src={preview ?? props.profileImage} />
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={props.ref}
        name={props.name}
        onBlur={props.onBlur}
        disabled={props.disabled}
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (file == null) return;
          setPreview(URL.createObjectURL(file));
          props.onChange(file);
        }}
      />
    </label>
  );
}
