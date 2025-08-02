import { useEffect, useRef } from 'react';
import {
  popSignUpFormApiError,
  signUpFormApiErrorObserver,
  SignUpFormErrors,
} from '../_lib/api-error';
import { FormSchema } from '../schema';

export function useSignUpFormApiErrors<Path extends keyof FormSchema>(
  fn: (errors: SignUpFormErrors<Path>) => void,
  paths: Path[]
) {
  const isLoadedRef = useRef(false);
  useEffect(() => {
    if (!isLoadedRef.current) {
      update();
      isLoadedRef.current = true;
    }

    return signUpFormApiErrorObserver.subscribe(update);

    function update() {
      const errors = popSignUpFormApiError(paths);
      if (errors.length > 0) fn(errors);
    }
  }, [fn, paths]);
}
