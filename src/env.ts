import { z } from 'zod';
import type { ZodError } from 'zod';

const EnvSchema = z
  .object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
    DATABASE_URL: z.string().url(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === 'production') {
      // TODO: 何か追加する必要の場合を追加する。
      // ctx.addIssue({
      //   code: z.ZodIssueCode.invalid_type,
      //   expected: 'string',
      //   received: 'undefined',
      //   path: ['DATABASE_AUTH_TOKEN'],
      //   message: "Must be set when NODE_ENV is 'production'",
      // });
    }
  });

export type env = z.infer<typeof EnvSchema>;

let env: env;

try {
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

// const env = EnvSchema.parse(process.env);

export default env;
