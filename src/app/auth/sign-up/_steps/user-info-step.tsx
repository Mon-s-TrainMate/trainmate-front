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
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SignUpUserInfoFormSchema, signUpUserInfoFormSchema } from '../schema';
interface UserInfoStepProps {
  onSubmit: (values: SignUpUserInfoFormSchema) => void;
}
export function UserInfoStep(props: UserInfoStepProps) {
  const form = useForm({
    resolver: zodResolver(signUpUserInfoFormSchema),
    mode: 'onBlur',
  });
  const router = useRouter();
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-10 w-full"
        onSubmit={form.handleSubmit(props.onSubmit)}
      >
        <h2 className="flex items-center gap-3 font-bold text-2xl">
          <button type="button" onClick={() => router.back()}>
            <ChevronLeftIcon />
          </button>
          <span>계정 정보</span>
        </h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="이름을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="이메일 주소를 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordCheck"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호를 확인해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isValid}>가입하기</Button>
      </form>
    </Form>
  );
}
