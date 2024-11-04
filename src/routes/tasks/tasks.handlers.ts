import type { AppRouteHandler } from '@/lib/type';
import type { ListRoute } from './tasks.routes';

export const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json([
    {
      name: 'Learn Hono',
      done: false,
    },
  ]);
};
