import { insertTasksSchema, selectTasksSchema } from '@/db/schema';
import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { createErrorSchema } from 'stoker/openapi/schemas';

const tags = ['Tasks'];

export const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(selectTasksSchema), 'The list of tasks'),
  },
});

export type ListRoute = typeof list;

export const create = createRoute({
  path: '/tasks',
  method: 'post',
  tags,
  request: {
    body: jsonContentRequired(insertTasksSchema, 'The task to create'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The created tasks'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      'The validation error',
    ),
  },
});

export type CreateRoute = typeof create;
