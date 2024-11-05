import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from '@/db/schema';
import { notFoundSchema } from '@/lib/constants';
import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentOneOf, jsonContentRequired } from 'stoker/openapi/helpers';
import { IdParamsSchema, createErrorSchema } from 'stoker/openapi/schemas';

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

export const getOne = createRoute({
  path: '/tasks/{id}',
  method: 'get',
  tags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The requested task'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      'Invalid id error',
    ),
  },
});

export type GetOneRoute = typeof getOne;

export const patch = createRoute({
  path: '/tasks/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchTasksSchema, 'The task update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The updated task'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(patchTasksSchema), createErrorSchema(IdParamsSchema)],
      'The validation error',
    ),
  },
});

export type PatchRoute = typeof patch;

export const remove = createRoute({
  path: '/tasks/{id}',
  method: 'delete',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: { description: 'Task deleted' },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error',
    ),
  },
});

export type RemoveRoute = typeof remove;
