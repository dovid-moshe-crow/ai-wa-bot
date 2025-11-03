# 🚀 Quick Setup Guide

Follow these steps to get your AI bot running:

## ✅ Step 1: Create Environment File

Create a file named `.env.local` in the project root with your credentials:

```bash
cat > .env.local << 'EOF'
DATABASE_URL=your-neon-database-url-here
OPENAI_API_KEY=your-openai-api-key-here
NODE_ENV=development
EOF
```

Or manually create `.env.local` and paste:
```
DATABASE_URL=your-neon-database-url-here
OPENAI_API_KEY=your-openai-api-key-here
NODE_ENV=development
```

**Replace:**
- `your-neon-database-url-here` with your actual Neon DATABASE_URL
- `your-openai-api-key-here` with your OpenAI API key

---

## ✅ Step 2: Install Dependencies

```bash
npm install
```

This will install:
- AI SDK with OpenAI
- Drizzle ORM + Neon driver
- Vercel Workflow SDK
- Next.js and all dependencies

---

## ✅ Step 3: Push Database Schema

```bash
npm run db:push
```

This creates the tables in your Neon database:
- `conversations`
- `messages`
- `knowledge_base`

---

## ✅ Step 4: Seed Knowledge Base

```bash
npm run seed
```

This populates your knowledge base with sample data about:
- Business hours
- Contact info
- FAQs
- Return policy
- Shipping info

---

## ✅ Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start chatting!

---

## 🎉 You're Done!

Try asking questions like:
- "What are your business hours?"
- "How do I track my order?"
- "What is your return policy?"

The AI will use the knowledge base to answer!

---

## 🔧 Troubleshooting

### Error: "DATABASE_URL is not set"
- Make sure `.env.local` exists and has the correct DATABASE_URL

### Error: "Invalid API key"
- Check your OPENAI_API_KEY in `.env.local`
- Get a new key from https://platform.openai.com/api-keys

### Database connection issues
- Verify your Neon database is active
- Check the DATABASE_URL format: `postgresql://user:password@host/database`

---

## 📊 Useful Commands

```bash
# View database in GUI
npm run db:studio

# Reset database (careful!)
npm run db:push

# Re-seed knowledge base
npm run seed
```

