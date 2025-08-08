'use client';

import { getUsersQueryKey } from '@/lib/users/query-key';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { JSX, useState } from 'react';
import { createUser } from './_actions/action';
import { setSignUpFormApiError } from './_lib/api-error';
import { clearSignUpFormSessionData } from './_lib/session-data';
import { GreetingStep } from './_steps/greeting-step';
import { Step0, keys as step0Keys } from './_steps/step-0';
import { Step1, keys as step1Keys } from './_steps/step-1';
import { Step2, keys as step2Keys } from './_steps/step-2';
import { signUpFormSchema } from './schema';

export default function Page() {
  const [stepIndex, setStepIndex] = useState(2);
  const router = useRouter();
  const queryClient = useQueryClient();

  const next = () => setStepIndex((step) => step + 1);
  const back = () => setStepIndex((step) => step - 1);
  const onSubmit = async (values: unknown) => {
    const data = signUpFormSchema.parse(values);
    const res = await createUser(data);
    if (res.success) {
      clearSignUpFormSessionData();
      await queryClient.invalidateQueries({
        queryKey: getUsersQueryKey('me'),
      });
      next();
    } else {
      setSignUpFormApiError(res.errors);
      let smallestIndex = steps.length;
      for (const [key] of Object.entries(res.errors)) {
        const index = steps.findIndex((step) => step.deps.includes(key));
        if (index < smallestIndex) {
          smallestIndex = index;
        }
      }
      setStepIndex(smallestIndex);
    }
  };

  const steps = [
    {
      Step: Step0,
      props: { onNext: next, onBack: () => router.back() },
      deps: step0Keys,
    },
    { Step: Step1, props: { onNext: next, onBack: back }, deps: step1Keys },
    { Step: Step2, props: { onSubmit, onBack: back }, deps: step2Keys },
    { Step: GreetingStep, props: {}, deps: [] },
  ] as {
    Step: (props: {
      onNext?: () => void;
      onBack?: () => void;
      onSubmit?: () => Promise<void>;
    }) => JSX.Element;
    props: {
      onNext?: () => void;
      onBack?: () => void;
      onSubmit?: () => Promise<void>;
    };
    deps: string[];
  }[];
  const step = steps[stepIndex];
  return (
    <div className="mt-20 flex h-full items-center justify-center pb-20">
      <div className="flex w-full max-w-lg flex-col gap-y-10 rounded-lg bg-white p-6 shadow-level-1">
        {step != null && <step.Step {...step.props} />}
      </div>
    </div>
  );
}
