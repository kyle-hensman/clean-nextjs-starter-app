/*
 * This database schema made to be compatible with BetterAuth
 * more information can be found here:
 * https://www.better-auth.com/docs/concepts/database#core-schema
*/

import { v4 as generateUuid } from 'uuid';
import { boolean, json, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// User table definition
export const users = pgTable('user', {
  id: text('id').primaryKey().$defaultFn(() => {return generateUuid();}),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('emailVerified').$defaultFn(() => {return false;}).notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
  updatedAt: timestamp('updatedAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
});

// Session table definition
export const sessions = pgTable('session', {
  id: text('id').primaryKey().$defaultFn(() => {return generateUuid();}),
  userId: text('userId').notNull().references(() => {return users.id;}, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expiresAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  createdAt: timestamp('createdAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
  updatedAt: timestamp('updatedAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
});

// Account table definition
export const accounts = pgTable('account', {
  id: text('id').primaryKey().$defaultFn(() => {return generateUuid();}),
  userId: text('userId').notNull().references(() => {return users.id;}, { onDelete: 'cascade' }),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  idToken: text('idToken'),
  password: text('password'),
  createdAt: timestamp('createdAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
  updatedAt: timestamp('updatedAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
});

// Verification table definition
export const verifications = pgTable('verification', {
  id: text('id').primaryKey().$defaultFn(() => {return generateUuid();}),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
  updatedAt: timestamp('updatedAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
});

// Todos objects created by users
export const todos = pgTable('todos', {
  id: text('id').primaryKey().$defaultFn(() => {return generateUuid();}),
  title: varchar('title').notNull(),
  userId: text('userId').notNull().references(() => {return users.id;}, { onDelete: 'cascade' }),
  completed: boolean('completed').notNull().default(false),
  deleted: boolean('deleted').notNull().default(false),
  archived: boolean('archived').notNull().default(false),
  createdAt: timestamp('createdAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
  updatedAt: timestamp('updatedAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
  deletedAt: timestamp('deletedAt'),
});

// Archived Todos objects created by users
export const archivedTodos = pgTable('archived_todos', {
  id: text('id').primaryKey().$defaultFn(() => {return generateUuid();}),
  todoId: text('todoId').notNull().references(() => {return todos.id;}, { onDelete: 'cascade' }),
  title: varchar('title').notNull(),
  userId: text('userId').notNull().references(() => {return users.id;}, { onDelete: 'cascade' }),
  completed: boolean('completed').notNull(),
  archivedAt: timestamp('archivedAt').$defaultFn(() => /* @__PURE__ */ {return new Date();}).notNull(),
  metadata: json('metadata'),
});
