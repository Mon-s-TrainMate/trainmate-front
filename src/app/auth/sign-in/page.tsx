'use client';

import { BrandCatchphrase } from '@/components/ui/brand-catchphrase';
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
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { SignInFormSchema, signInFormSchema } from './schema';

const userTypes: { value: SignInFormSchema['userType']; label: string }[] = [
  { value: 'member', label: '개인 회원' },
  { value: 'trainer', label: '트레이너' },
];

export default function Page() {
  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      userType: 'member' as const,
      email: '',
      password: '',
      keepLogin: false,
    },
  });
  return (
    <div className="flex flex-col items-center gap-15 mt-35">
      <BrandCatchphrase />
      <Form {...form}>
        <form
          className="flex flex-col gap-y-10 max-w-lg px-4 w-full"
          onSubmit={form.handleSubmit((values) => {
            console.log(values);
          })}
        >
          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">회원 유형</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="grid grid-cols-2 gap-2.5 p-2 rounded-xl bg-gray-1"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    {userTypes.map((userType) => (
                      <FormItem key={userType.value}>
                        <FormControl>
                          <RadioGroupItem
                            className="hidden peer"
                            value={userType.value}
                          />
                        </FormControl>
                        <FormLabel className="flex justify-center items-center peer-aria-checked:bg-white peer-aria-checked:shadow-tab-active bg-transparent text-gray-5 rounded-md h-13 text-lg font-bold text-center peer-aria-checked:text-primary">
                          {userType.label}
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
            name="keepLogin"
            render={({ field }) => (
              <FormItem>
                <Separator />
                <div className="flex items-center">
                  <FormControl>
                    <input
                      type="checkbox"
                      ref={field.ref}
                      name={field.name}
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormLabel>로그인 상태 유지하기</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">로그인하기</Button>
          <Link
            href="/auth/sign-up"
            className="grid grid-cols-[1fr_max-content_1fr] items-center gap-x-6.25 break-keep text-gray-5"
          >
            <Separator />
            <span>회원가입</span>
            <Separator />
          </Link>
        </form>
      </Form>
    </div>
  );
}
