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
import { Separator } from '@/components/ui/separator';
import { useMemberProfile } from '@/features/member/hooks/use-member-profile';
import { useUpdateMemberProfile } from '@/features/member/hooks/use-update-member-profile';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlertIcon, PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdatingProfileSchema, updatingProfileSchema } from '../schema';

interface MemberProfileWidgetProps {
  memberId: string;
}
export function MemberProfileWidget({ memberId }: MemberProfileWidgetProps) {
  const { data } = useMemberProfile(memberId);

  return (
    <div className="flex items-start gap-x-5 rounded-lg bg-white p-6">
      <div className="grid flex-1 items-center gap-4 @xs:grid-cols-[1fr_max-content_1fr] @3xl:grid-cols-[1fr_max-content_1fr_max-content_1fr_max-content_1fr]">
        <Value title="키" value={data?.heightCm} unit="cm" />
        <VerticalSeparator className="hidden @xs:block" />
        <Value title="몸무게" value={data?.weightKg} unit="kg" />
        <VerticalSeparator className="hidden @3xl:block" />
        <Value title="체지방량" value={data?.bodyFatPercentage} unit="%" />
        <VerticalSeparator className="hidden @xs:block" />
        <Value title="근골격량" value={data?.muscleMassKg} unit="kg" />
      </div>
      <ProfileEditDialog memberId={memberId} />
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

interface DialogForm {
  memberId: string;
  setOpen: (open: boolean) => void;
}
function DialogForm({ memberId, setOpen }: DialogForm) {
  const { data } = useMemberProfile(memberId);
  const mutation = useUpdateMemberProfile({
    memberId,
    onSuccess() {
      setOpen(false);
    },
  });
  const form = useForm({
    resolver: zodResolver(updatingProfileSchema),
    defaultValues: {
      height_cm: String(data?.heightCm ?? ''),
      weight_kg: String(data?.weightKg ?? ''),
      body_fat_percentage: String(data?.bodyFatPercentage ?? ''),
      muscle_mass_kg: String(data?.muscleMassKg ?? ''),
    },
  });

  const fieldConfigs = [
    { name: 'height_cm', unit: 'cm', label: '키' },
    { name: 'weight_kg', unit: 'kg', label: '몸무게' },
    { name: 'body_fat_percentage', unit: '%', label: '체지방량' },
    { name: 'muscle_mass_kg', unit: 'kg', label: '근골격량' },
  ] satisfies {
    name: keyof UpdatingProfileSchema;
    unit: string;
    label: string;
  }[];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          mutation.mutate({
            height_cm: Number(values.height_cm),
            weight_kg: Number(values.weight_kg),
            body_fat_percentage: Number(values.body_fat_percentage),
            muscle_mass_kg: Number(values.muscle_mass_kg),
          });
        })}
        className="flex flex-col gap-y-10"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-3 text-2xl font-bold">
            <CircleAlertIcon className="text-primary" />
            인바디 수정
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {fieldConfigs.map((config) => (
            <FormField
              key={config.name}
              control={form.control}
              name={config.name}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-2 text-black">
                  <FormLabel className="text-sm">{config.label}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input inputMode="numeric" {...field} />
                      <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-lg">
                        {config.unit}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <DialogFooter className="grid grid-cols-2 gap-x-2.5">
          <Button
            type="reset"
            size="lg"
            variant="secondary"
            onClick={() => {
              form.reset();
              setOpen(false);
            }}
            disabled={form.formState.disabled || mutation.isPending}
          >
            취소하기
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.disabled || mutation.isPending}
          >
            편집하기
          </Button>
        </DialogFooter>
      </form>
    </Form>
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
        <div className="flex items-end gap-x-2 text-sm text-black @lg:text-2xl">
          <span className="text-2xl @lg:text-4xl">{value}</span>
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

interface VerticalSeparatorProps {
  className?: string;
}
function VerticalSeparator({ className }: VerticalSeparatorProps) {
  return (
    <Separator
      orientation="vertical"
      className={cn('max-h-8 min-w-0.5 rounded-full', className)}
    />
  );
}
