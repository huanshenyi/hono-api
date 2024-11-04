import db from '@/db';
import { taskTable } from '@/db/schema';
import type { AppRouteHandler } from '@/lib/type';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import type { CreateRoute, ListRoute } from './tasks.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.taskTable.findMany();
  return c.json(tasks);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json');
  const [inserted] = await db.insert(taskTable).values(task).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};
