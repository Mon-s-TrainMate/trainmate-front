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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { getUsersQueryKey } from '@/lib/users/query-key';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { getUser } from './_actions/action';
import { SignInFormSchema, signInFormSchema } from './schema';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

const userTypes: { value: SignInFormSchema['userType']; label: string }[] = [
  { value: 'member', label: '개인 회원' },
  { value: 'trainer', label: '트레이너' },
];

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

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
          onSubmit={form.handleSubmit(async (values) => {
            const res = await getUser(values);
            if (res.success) {
              await queryClient.invalidateQueries({
                queryKey: getUsersQueryKey('me'),
              });
              router.push('/');
            } else {
              for (const [key, errors] of Object.entries(res.errors)) {
                const fieldName = key === 'non_field_errors' ? 'root' : key;
                form.setError(fieldName as 'root', {
                  type: 'manual',
                  message: errors[0],
                });
              }
              setIsAlertOpen(true);
            }
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
                  <Input
                    placeholder="이메일 주소를 입력해주세요."
                    {...field}
                    className={`focus-visible:border-primary ${
                      field.value ? 'border-primary' : ''
                    }`}
                  />
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
                    className={`focus-visible:border-primary ${
                      field.value ? 'border-primary' : ''
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-destructive text-sm">
              {form.formState.errors.root.message}
            </p>
          )}
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
                  <FormLabel className={field.value ? 'text-primary' : ''}>
                    로그인 상태 유지하기
                  </FormLabel>
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

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="flex-row">
            <AlertCircle color="#E33434" />
            <div>
              <AlertDialogTitle>계정 정보를 확인해주세요.</AlertDialogTitle>
              <AlertDialogDescription>
                가입하신 이메일, 비밀번호를 다시 확인해주세요.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              autoFocus
              className="w-full"
              onClick={() => setIsAlertOpen(false)}
            >
              확인하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
