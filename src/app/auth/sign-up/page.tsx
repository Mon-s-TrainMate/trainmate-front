'use client';

import { useRef, useState } from 'react';
import { AgreementStep } from './_steps/agreement-step';
import { GreetingStep } from './_steps/greeting-step';
import { UserInfoStep } from './_steps/user-info-step';
import { SignUpAgreementFormSchema } from './schema';

export default function Page() {
  const agreementResultRef = useRef<SignUpAgreementFormSchema>(undefined);
  const [step, setStep] = useState(0);
  const next = () => setStep((step) => step + 1);
  const prev = () => setStep((step) => step - 1);
  return (
    <div className="flex flex-col items-center gap-15 mt-45">
      <div className="flex flex-col gap-y-10 max-w-lg px-4 w-full">
        {step === 0 && (
          <AgreementStep
            onSubmit={(values) => {
              agreementResultRef.current = values;
              next();
            }}
          />
        )}
        {step === 1 && (
          <UserInfoStep
            agreementResultRef={agreementResultRef}
            prev={prev}
            next={next}
          />
        )}
        {step === 2 && <GreetingStep />}
      </div>
    </div>
  );
}
