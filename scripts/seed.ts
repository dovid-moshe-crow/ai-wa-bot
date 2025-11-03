/**
 * Seed script - populates the knowledge base with sample data
 * Run with: npm run seed
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { knowledgeBase } from '../db/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function seed() {
  console.log('🌱 Seeding knowledge base...');

  const sampleKnowledge = [
    {
      category: 'company_info',
      title: 'Business Hours',
      content: 'We are open Monday to Friday, 9 AM to 5 PM EST. Closed on weekends and major holidays.',
    },
    {
      category: 'company_info',
      title: 'Contact Information',
      content: 'Email: support@example.com | Phone: (555) 123-4567 | Address: 123 Main St, City, State 12345',
    },
    {
      category: 'faq',
      title: 'How do I track my order?',
      content: 'You can track your order by logging into your account and visiting the "Orders" section. You will receive a tracking number via email once your order ships.',
    },
    {
      category: 'faq',
      title: 'What is your return policy?',
      content: 'We accept returns within 30 days of purchase. Items must be unused and in original packaging. Contact support to initiate a return.',
    },
    {
      category: 'faq',
      title: 'Do you offer international shipping?',
      content: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check our shipping page for details.',
    },
    {
      category: 'products',
      title: 'Product Categories',
      content: 'We offer Electronics, Clothing, Home & Garden, and Sports & Outdoors products.',
    },
    {
      category: 'products',
      title: 'Payment Methods',
      content: 'We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.',
    },
  ];

  try {
    for (const item of sampleKnowledge) {
      await db.insert(knowledgeBase).values(item);
      console.log(`  ✓ Added: ${item.title}`);
    }

    console.log('\n✅ Seeding complete!');
    console.log(`📊 Added ${sampleKnowledge.length} knowledge base entries`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

