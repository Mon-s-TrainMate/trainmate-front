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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSignUpFormApiErrors } from '../_hooks/use-errors';
import { useUserDataGuard } from '../_hooks/use-user-data';
import {
  appendSignUpFormSessionData,
  getSignUpFormSessionData,
} from '../_lib/session-data';
import { signUpFormSchema } from '../schema';
import { keys as step0Keys } from './step-0';

const prevKeys = step0Keys;

const schema = signUpFormSchema.pick({
  user_type: true,
  name: true,
  email: true,
});

export const keys = Object.keys(
  schema.def.shape
) as (keyof typeof schema.def.shape)[];

interface Props {
  onNext: () => void;
  onBack: () => void;
}
export function Step1({ onBack, onNext }: Props) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      user_type: 'member' as const,
      name: '',
      email: '',
    },
  });
  useUserDataGuard(onBack, prevKeys);
  useSignUpFormApiErrors((errors) => {
    for (const { path, messages } of errors) {
      form.setError(path, { message: messages.join('\n') });
    }
  }, keys);

  useEffect(() => {
    const { user_type, name, email } = getSignUpFormSessionData();
    if (user_type != null) form.setValue('user_type', user_type);
    if (name != null) form.setValue('name', name);
    if (email != null) form.setValue('email', email);
  }, [form]);
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-10 w-full"
        onSubmit={form.handleSubmit((values) => {
          appendSignUpFormSessionData(values);
          onNext();
        })}
      >
        <h2 className="flex items-center gap-3 font-bold text-2xl">
          <button type="button" onClick={onBack}>
            <ChevronLeftIcon />
          </button>
          <span>계정 정보</span>
        </h2>

        <FormField
          control={form.control}
          name="user_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">
                가입 유형을 선택해주세요.
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-2 gap-2"
                >
                  {radios.map((radio) => (
                    <FormItem
                      key={radio.value}
                      className="flex items-center gap-x-2"
                    >
                      <FormControl>
                        <RadioGroupItem value={radio.value} className="peer" />
                      </FormControl>
                      <FormLabel className="peer-aria-checked:text-primary text-lg">
                        {radio.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">이름</FormLabel>
              <FormControl className="text-lg">
                <Input
                  autoComplete="name"
                  placeholder="이름을 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">이메일</FormLabel>
              <FormControl className="text-lg">
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="이메일을 입력해주세요."
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

const radios = [
  { value: 'member', label: '일반 회원' },
  { value: 'trainer', label: '트레이너' },
];
