import { db, conversations, messages } from '@/db';
import { eq, desc } from 'drizzle-orm';

/**
 * Get or create a conversation for a user
 */
export async function getOrCreateConversation(userId: string) {
  // Find existing conversation
  const existing = await db.query.conversations.findFirst({
    where: eq(conversations.userId, userId),
    orderBy: [desc(conversations.updatedAt)],
  });

  if (existing) {
    return existing;
  }

  // Create new conversation
  const [newConversation] = await db
    .insert(conversations)
    .values({ userId })
    .returning();

  return newConversation;
}

/**
 * Get conversation history (messages)
 */
export async function getConversationHistory(conversationId: string) {
  return await db.query.messages.findMany({
    where: eq(messages.conversationId, conversationId),
    orderBy: [desc(messages.createdAt)],
    limit: 20, // Last 20 messages
  });
}

/**
 * Save a message to the database
 */
export async function saveMessage(data: {
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: Record<string, any>;
}) {
  const [message] = await db.insert(messages).values(data).returning();

  // Update conversation's updatedAt
  await db
    .update(conversations)
    .set({ updatedAt: new Date() })
    .where(eq(conversations.id, data.conversationId));

  return message;
}

