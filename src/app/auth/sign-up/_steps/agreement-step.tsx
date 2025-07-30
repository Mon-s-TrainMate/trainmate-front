'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { agreementData } from '../data';
import {
  SignUpAgreementFormSchema,
  signUpAgreementFormSchema,
} from '../schema';
interface AgreementStepProps {
  onSubmit: (values: SignUpAgreementFormSchema) => void;
}
export function AgreementStep(props: AgreementStepProps) {
  const form = useForm({
    resolver: zodResolver(signUpAgreementFormSchema),
    defaultValues: {
      serviceTos: false,
      personalInformationTos: false,
      optionalTos: false,
    },
    mode: 'onChange',
  });
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
          <span>이용약관</span>
        </h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="all">
            <AccordionTrigger>
              <div
                className="flex items-center gap-x-2 text-gray-5 aria-checked:text-gray-8"
                aria-checked={allChecked}
              >
                <input
                  type="checkbox"
                  checked={allChecked}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const checked = e.currentTarget.checked;
                    handleSelectAll(checked);
                  }}
                />
                {agreementData.all.label}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="rounded-xl py-2.5 px-4 border text-gray-5 max-h-85 overflow-y-auto">
                {agreementData.all.content}
              </div>
            </AccordionContent>
          </AccordionItem>
          {agreementData.items.map((item) => (
            <AccordionItem key={item.name} value={item.name}>
              <AccordionTrigger>
                <FormField
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem
                      className="flex items-center gap-x-2 text-gray-5 aria-checked:text-gray-8"
                      aria-checked={field.value}
                    >
                      <FormControl>
                        <div>
                          <input
                            type="checkbox"
                            ref={field.ref}
                            onClick={(e) => e.stopPropagation()}
                            name={field.name}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            checked={field.value}
                            disabled={field.disabled}
                            required={item.required}
                          />
                        </div>
                      </FormControl>
                      ({item.required ? '필수' : '선택'}) {item.label}
                    </FormItem>
                  )}
                />
              </AccordionTrigger>
              <AccordionContent>
                <div className="rounded-xl py-2.5 px-4 border text-gray-5 max-h-85 overflow-y-auto">
                  {item.content}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button disabled={!form.formState.isValid}>가입하기</Button>
      </form>
    </Form>
  );
}
