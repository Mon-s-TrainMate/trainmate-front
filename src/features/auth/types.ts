export interface User {
  id: number;
  name: string;
  email: string;
  user_type: 'trainer' | 'member';
}
