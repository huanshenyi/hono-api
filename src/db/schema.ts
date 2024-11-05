import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const taskTable = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  done: integer({ mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updateAt: integer('update_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const selectTasksSchema = createSelectSchema(taskTable);

export const insertTasksSchema = createInsertSchema(taskTable, {
  name: (schema) => schema.name.min(1).max(500),
})
  .required({
    done: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updateAt: true,
  });
