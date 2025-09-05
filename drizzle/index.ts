import { drizzle } from 'drizzle-orm/node-postgres';

import { accounts, sessions, todos, users, verifications } from './schema';

export const db = drizzle(process.env.DATABASE_URL!, { schema: { todos, users, sessions, accounts, verifications } });
