import { db, knowledgeBase } from '@/db';
import { eq } from 'drizzle-orm';

/**
 * Get all knowledge base entries (optionally filtered by category)
 */
export async function getKnowledgeBase(category?: string) {
  if (category) {
    return await db.query.knowledgeBase.findMany({
      where: eq(knowledgeBase.category, category),
    });
  }
  return await db.query.knowledgeBase.findMany();
}

/**
 * Build system prompt with knowledge base context
 */
export async function buildSystemPrompt(): Promise<string> {
  const knowledge = await getKnowledgeBase();
  
  if (knowledge.length === 0) {
    return `You are a helpful customer service assistant. Be friendly, professional, and concise.`;
  }

  const knowledgeText = knowledge
    .map(item => `[${item.category}] ${item.title}:\n${item.content}`)
    .join('\n\n');

  return `You are a helpful customer service assistant. Be friendly, professional, and concise.

Here is important information you should use to answer questions:

${knowledgeText}

Use this information when relevant, but don't force it into every response. If a question is outside your knowledge, politely say so.`;
}

/**
 * Add a new knowledge base entry
 */
export async function addKnowledge(data: {
  category: string;
  title: string;
  content: string;
  metadata?: Record<string, any>;
}) {
  const [entry] = await db.insert(knowledgeBase).values(data).returning();
  return entry;
}

