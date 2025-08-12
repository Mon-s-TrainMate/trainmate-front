'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpFormSchema } from '@/features/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSignUpFormApiErrors } from '../_hooks/use-errors';
import { useUserDataGuard } from '../_hooks/use-user-data';
import { getSignUpFormSessionData } from '../_lib/session-data';
import { keys as step0Keys } from './step-0';
import { keys as step1Keys } from './step-1';

const prevKeys = [...step0Keys, ...step1Keys];

const schema = signUpFormSchema
  .pick({
    password: true,
    confirm_password: true,
  })
  .refine((schema) => schema.password === schema.confirm_password, {
    path: ['confirm_password'],
    error: '비밀번호가 일치하지 않습니다.',
  });

export const keys = Object.keys(
  schema.def.shape
) as (keyof typeof schema.def.shape)[];

interface Props {
  onBack: () => void;
  onSubmit: (values: unknown) => Promise<void>;
}
export function Step2({ onBack, onSubmit }: Props) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });
  useUserDataGuard(onBack, prevKeys);
  useSignUpFormApiErrors((errors) => {
    for (const { path, messages } of errors) {
      form.setError(path, { message: messages.join('\n') });
    }
  }, keys);
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-y-10"
        onSubmit={form.handleSubmit(async (values) => {
          const data = {
            ...getSignUpFormSessionData(),
            ...values,
          };
          await onSubmit?.(data);
        })}
      >
        <h2 className="flex items-center gap-3 text-2xl font-bold">
          <button type="button" onClick={onBack}>
            <ChevronLeftIcon />
          </button>
          <span>계정 정보</span>
        </h2>

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">비밀번호</FormLabel>
              <FormControl className="text-lg">
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="비밀번호를 입력하세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirm_password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">
                비밀번호 확인
              </FormLabel>
              <FormControl className="text-lg">
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="비밀번호를 확인하세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>다음</Button>
      </form>
    </Form>
  );
}
