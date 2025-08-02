import z from 'zod';

export const emailSchema = z.email({ error: '이메일을 입력해주세요.' });
export const passwordSchema = z
  .string()
  .trim()
  .regex(/^[a-zA-Z0-9`~!@#$%^&*()\-_=+\\|.,<>/?;:'"[\]{}]+$/, {
    error: '비밀번호는 영문, 숫자, 특수문자만 포함되어야 합니다.',
  })
  .regex(/[a-zA-Z]/, {
    error: '비밀번호에 영문이 한 글자 이상 포함되어야 합니다.',
  })
  .regex(/[0-9]/, {
    error: '비밀번호에 숫자가 한 글자 이상 포함되어야 합니다.',
  })
  .regex(/[`~!@#$%^&*()\-_=+\\|.,<>/?;:'"[\]{}]/, {
    error: '비밀번호에 특수문자가 한 글자 이상 포함되어야 합니다.',
  })
  .min(10, { error: '비밀번호는 10자리 이상이어야 합니다.' });
