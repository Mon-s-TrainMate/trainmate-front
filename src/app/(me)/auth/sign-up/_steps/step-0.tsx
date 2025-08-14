'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { signUpFormSchema } from '@/features/auth/schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSignUpFormApiErrors } from '../_hooks/use-errors';
import {
  appendSignUpFormSessionData,
  getSignUpFormSessionData,
} from '../_lib/session-data';

const schema = signUpFormSchema.pick({
  terms_agreed: true,
  privacy_agreed: true,
  marketing_agreed: true,
});

export const keys = Object.keys(
  schema.def.shape
) as (keyof typeof schema.def.shape)[];

interface Props {
  onNext: () => void;
  onBack: () => void;
}
export function Step0(props: Props) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      terms_agreed: false,
      privacy_agreed: false,
      marketing_agreed: false,
    },
    mode: 'onChange',
  });
  useEffect(() => {
    const { terms_agreed, privacy_agreed, marketing_agreed } =
      getSignUpFormSessionData();
    if (terms_agreed != null) form.setValue('terms_agreed', terms_agreed);
    if (privacy_agreed != null) form.setValue('privacy_agreed', privacy_agreed);
    if (marketing_agreed != null)
      form.setValue('marketing_agreed', marketing_agreed);
    form.trigger();
  }, [form]);
  useSignUpFormApiErrors((errors) => {
    for (const { path, messages } of errors) {
      form.setError(path, { message: messages.join('\n') });
    }
  }, keys);
  const fieldNames = agreementData.items.map((item) => item.name);
  const checkedStates = useWatch({
    name: fieldNames,
    control: form.control,
  });
  const allChecked = checkedStates.every(Boolean);
  const handleSelectAll = (checked: boolean) => {
    for (const key of fieldNames) {
      form.setValue(key, checked, { shouldValidate: true });
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-y-10"
        onSubmit={form.handleSubmit((values) => {
          appendSignUpFormSessionData(values);
          props.onNext();
        })}
      >
        <h2 className="flex items-center gap-3 text-2xl font-bold">
          <button type="button" onClick={props.onBack}>
            <ChevronLeftIcon />
          </button>
          <span>이용약관</span>
        </h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="all">
            <div className="flex">
              <label
                className={cn(
                  'flex flex-1 items-center gap-x-2 text-base font-semibold text-gray-2 select-none aria-checked:text-primary'
                )}
                aria-checked={allChecked}
              >
                <Checkbox
                  checked={allChecked}
                  onCheckedChange={(checked) => {
                    checked = checked === 'indeterminate' ? true : checked;
                    handleSelectAll(checked);
                  }}
                />
                {agreementData.all.label}
              </label>
              <AccordionTrigger className="w-8 justify-end" />
            </div>
            <AccordionContent>
              <div className="max-h-85 overflow-y-auto rounded-xl border px-4 py-2.5 text-gray-2">
                {agreementData.all.content}
              </div>
            </AccordionContent>
          </AccordionItem>
          {agreementData.items.map((item) => (
            <AccordionItem key={item.name} value={item.name}>
              <div className="flex">
                <FormField
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <label
                        className={cn(
                          'flex items-center gap-x-2 text-base font-semibold text-gray-2 select-none aria-checked:text-primary'
                        )}
                        aria-checked={field.value}
                      >
                        <FormControl>
                          <Checkbox
                            ref={field.ref}
                            name={field.name}
                            onBlur={field.onBlur}
                            onCheckedChange={field.onChange}
                            checked={field.value}
                            disabled={field.disabled}
                            required={item.required}
                          />
                        </FormControl>
                        ({item.required ? '필수' : '선택'}) {item.label}
                      </label>
                    </FormItem>
                  )}
                />
                <AccordionTrigger className="w-8 justify-end" />
              </div>
              <AccordionContent>
                <div className="max-h-85 overflow-y-auto rounded-xl border px-4 py-2.5 whitespace-pre-line text-gray-2">
                  {item.content}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button disabled={!form.formState.isValid}>다음</Button>
      </form>
    </Form>
  );
}

export const agreementData = {
  all: {
    label: '전체 동의하기',
    content:
      '서비스 이용약관, 인증된 이메일로 가입, 이벤트・혜택 정보 수신(선택) 동의를 포함합니다.',
  },
  items: [
    {
      name: 'terms_agreed' as const,
      label: '서비스 이용약관에 동의합니다.',
      content:
        "법학에서 '법률'이란 '일반적으로 입법부가 의결하고 국가원수가 공포하는 법'을 가리킨다. 여기서 입법(立法)이란 '국가가 법조의 형식으로 일반적ㆍ추상적 규율을 제정하는 작용, 또는 그에 의하여 제정된 법규범'을 의미하는데, '일반'이라 함은 불특정다수인을 대상으로 함을 의미하고, '추상'이라 함은 불특정다수의 사건에 적용됨을 가리킨다. 규율은 생활관계를 일방적, 구속적으로 확인하고 형성하는 고권적 명령으로 정의된다. 따라서 법률은 국가와 국민간의 관계를 규율하여 국민에 대하여 직접 구속력을 갖는다.\n \n 만약 일반성과 추상성을 가지지 않게 된다면, 삼권분립의 원칙에서 벗어나 입법자가 사실상 행정적, 사법적 권력을 휘두룰 수 있는 위험이 있게 된다.[3] 이렇듯 구체적인 범위를 정한 법률을 처분적 법률이라고 하는데, 원칙적으로는 삼권분립의 원칙에 어긋나 무효이다. 다만, 공익적 성격이 강한 경우에는 예외적으로 처분적 법률이 허용되기도 한다. 대표적으로는 5·18 특별법이나 세월호 특별법 등이 있다. 5·18 민주화운동이라는 구체적 사례에서 발생한 위법 행위들에 대해 공소시효를 정지하거나,재심 제도를 두는 등 처분적 법률이 이루어졌다.",
      required: true,
    },
    {
      name: 'privacy_agreed' as const,
      label: '개인정보 수집 및 이용에 동의합니다.',
      content: '내용 '.repeat(1000),
      required: true,
    },
    {
      name: 'marketing_agreed' as const,
      label: '이벤트 혜택 정보 수신에 동의합니다.',
      content: '내용 '.repeat(1000),
    },
  ],
};
