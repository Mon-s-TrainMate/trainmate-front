import { API_HOST } from '@/lib/consts';
import { http } from 'msw';

export const mswLogger = http.all(API_HOST + '/*', ({ request }) => {
  console.info(request.method, request.url, request.headers);
});
