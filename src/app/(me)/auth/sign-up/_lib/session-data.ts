import { SignUpFormSchema } from '../schema';

export function getSignUpFormSessionData(): Partial<SignUpFormSchema> {
  const raw = sessionStorage.getItem('sign-up-form');
  if (raw == null) return {};
  return JSON.parse(raw);
}
export function appendSignUpFormSessionData(data: Partial<SignUpFormSchema>) {
  const union = { ...getSignUpFormSessionData(), ...data };
  sessionStorage.setItem('sign-up-form', JSON.stringify(union));
}
export function clearSignUpFormSessionData() {
  sessionStorage.removeItem('sign-up-form');
}
