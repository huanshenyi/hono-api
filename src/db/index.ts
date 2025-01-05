import env from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// postgres clientの設定
console.log('db:', env.DATABASE_URL);
const client = postgres(env.DATABASE_URL);

// drizzleインスタンスの作成
const db = drizzle({
  client,
  schema: {
    ...schema,
  },
});

export default db;
