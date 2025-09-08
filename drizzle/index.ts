import { drizzle } from 'drizzle-orm/node-postgres';

import { accounts, archivedTodos, sessions, todos, users, verifications } from './schema';

export const db = drizzle(process.env.DATABASE_URL!, { schema: { todos, archivedTodos, users, sessions, accounts, verifications } });
