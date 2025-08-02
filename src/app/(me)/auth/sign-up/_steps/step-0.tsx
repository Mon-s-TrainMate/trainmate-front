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
import { formSchema } from '../schema';

const schema = formSchema.pick({
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
        className="flex flex-col gap-y-10 w-full"
        onSubmit={form.handleSubmit((values) => {
          appendSignUpFormSessionData(values);
          props.onNext();
        })}
      >
        <h2 className="flex items-center gap-3 font-bold text-2xl">
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
                  'flex-1 flex items-center gap-x-2 text-gray-5 aria-checked:text-primary font-semibold text-base select-none'
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
              <div className="rounded-xl py-2.5 px-4 border text-gray-5 max-h-85 overflow-y-auto">
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
                          'flex items-center gap-x-2 text-gray-5 aria-checked:text-primary font-semibold text-base select-none'
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
                <div className="rounded-xl py-2.5 px-4 border text-gray-5 max-h-85 overflow-y-auto">
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
      content: '내용 '.repeat(1000),
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
