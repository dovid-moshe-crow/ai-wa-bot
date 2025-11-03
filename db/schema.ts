import { pgTable, text, timestamp, uuid, jsonb, index } from 'drizzle-orm/pg-core';

/**
 * Conversations - tracks each unique conversation/session
 */
export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(), // Phone number or user identifier
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  metadata: jsonb('metadata'), // Additional info (name, tags, etc.)
}, (table) => ({
  userIdIdx: index('user_id_idx').on(table.userId),
}));

/**
 * Messages - stores all messages in conversations
 */
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').references(() => conversations.id).notNull(),
  role: text('role').notNull(), // 'user' or 'assistant'
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  metadata: jsonb('metadata'), // Token count, model used, etc.
}, (table) => ({
  conversationIdIdx: index('conversation_id_idx').on(table.conversationId),
}));

/**
 * Knowledge Base - stores information the AI should know
 * This is your AI's custom data (company info, FAQs, products, etc.)
 */
export const knowledgeBase = pgTable('knowledge_base', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: text('category').notNull(), // e.g., 'faq', 'products', 'company_info'
  title: text('title').notNull(),
  content: text('content').notNull(),
  metadata: jsonb('metadata'), // Tags, priority, etc.
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  categoryIdx: index('category_idx').on(table.category),
}));

