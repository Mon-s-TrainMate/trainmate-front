import type { SignUpFormSchema } from '@/features/auth/schema';
import { Observer } from '@/lib/observer/observer';

type FieldName = keyof SignUpFormSchema;

export type SignUpFormErrors<Path = FieldName> = {
  path: Path;
  messages: string[];
}[];

let globalErrors: SignUpFormErrors = [];

export function getSignUpFormApiError() {
  return globalErrors;
}
export function setSignUpFormApiError(
  errors: Partial<Record<FieldName, string[]>>
) {
  globalErrors = Object.entries(errors).map(([path, messages]) => ({
    path: path as FieldName,
    messages,
  }));
  signUpFormApiErrorObserver.emit();
}
export function popSignUpFormApiError<Path extends FieldName>(paths: Path[]) {
  const keyset = new Set<string>(paths);
  const result = globalErrors.filter((error) => keyset.has(error.path));
  globalErrors = globalErrors.filter((error) => !keyset.has(error.path));
  return result as { path: Path; messages: string[] }[];
}

export const signUpFormApiErrorObserver = new Observer();
