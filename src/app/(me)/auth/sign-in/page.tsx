'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { BrandCatchphrase } from '@/components/ui/brand-catchphrase';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { useSignIn } from '@/features/auth/hooks/use-sign-in';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const router = useRouter();
  const mutation = useSignIn();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      userType: 'member' as const,
      email: '',
      password: '',
      keepLogin: false,
    },
  });
  return (
    <div className="mt-20 flex min-h-screen flex-col items-center justify-center pb-20">
      <div className="flex w-136 flex-col items-center gap-15 rounded-xl bg-white p-8">
        <BrandCatchphrase />
        <Form {...form}>
          <form
            className="flex w-full max-w-lg flex-col gap-y-10 px-4"
            onSubmit={form.handleSubmit(async (values) => {
              const res = await mutation.mutateAsync(values);
              if (res.success) {
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
              <p className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="keepLogin"
                render={({ field }) => (
                  <FormItem>
                    <Separator />
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel
                        className={field.value ? 'text-primary' : 'text-gray-2'}
                      >
                        로그인 상태 유지하기
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit" className="h-14.5">
                로그인하기
              </Button>
              <Link
                href="/auth/sign-up"
                className="grid grid-cols-[1fr_max-content_1fr] items-center gap-x-6.25 break-keep text-gray-2"
              >
                <Separator />
                <span>회원가입</span>
                <Separator />
              </Link>
            </div>
          </form>
        </Form>
      </div>

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
