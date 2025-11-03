# 🤖 AI WhatsApp Bot

AI-powered customer service bot built with **Next.js**, **Vercel AI SDK**, **OpenAI**, and **Drizzle ORM**.

## 🚀 Features

- ✅ **AI Chat Interface** - Test your bot in a web interface
- ✅ **Knowledge Base** - Store custom data for AI responses
- ✅ **Conversation History** - Track all customer interactions
- ✅ **Workflow Durability** - Reliable message processing with auto-retry
- ✅ **Streaming Responses** - Real-time AI responses
- 🔜 **WhatsApp Integration** - Coming soon!

## 📦 Tech Stack

- **Framework**: Next.js 15 with App Router
- **AI**: Vercel AI SDK + OpenAI GPT-4
- **Database**: Neon Postgres
- **ORM**: Drizzle ORM
- **Workflows**: Vercel Workflow Development Kit
- **Styling**: Tailwind CSS

---

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Database (your Neon database URL)
DATABASE_URL=postgresql://user:password@host/database

# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-...

# Environment
NODE_ENV=development
```

### 3. Set Up Database

Push the database schema to Neon:

```bash
npm run db:push
```

### 4. Seed Knowledge Base

Populate the database with sample knowledge:

```bash
npm run seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start chatting! 🎉

---

## 📂 Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # AI chat API with workflow
│   └── page.tsx                # Chat UI
├── db/
│   ├── schema.ts               # Database schema (Drizzle)
│   └── index.ts                # Database client
├── lib/
│   ├── conversations.ts        # Conversation management
│   └── knowledge-base.ts       # Knowledge base utilities
├── scripts/
│   └── seed.ts                 # Database seeding script
├── drizzle.config.ts           # Drizzle configuration
└── package.json
```

---

## 🗃️ Database Schema

### **conversations**
Tracks unique conversation sessions
- `id` - UUID (primary key)
- `userId` - User identifier (phone number or ID)
- `createdAt` / `updatedAt` - Timestamps

### **messages**
Stores all messages in conversations
- `id` - UUID (primary key)
- `conversationId` - Foreign key to conversations
- `role` - 'user' or 'assistant'
- `content` - Message text
- `createdAt` - Timestamp

### **knowledge_base**
Your AI's custom knowledge
- `id` - UUID (primary key)
- `category` - e.g., 'faq', 'products', 'company_info'
- `title` - Entry title
- `content` - Entry content
- `createdAt` / `updatedAt` - Timestamps

---

## 🎯 How It Works

### 1. **Knowledge Base**
Add information your AI should know:
```typescript
await addKnowledge({
  category: 'faq',
  title: 'What are your hours?',
  content: 'We are open Monday-Friday, 9 AM - 5 PM EST.',
});
```

### 2. **AI Processing**
The AI automatically:
- Retrieves relevant knowledge from the database
- Maintains conversation context
- Generates responses using OpenAI GPT-4
- Saves all messages to history

### 3. **Workflow Durability**
Using `"use workflow"` and `"use step"`:
- Auto-retries on failures
- Maintains state across deployments
- Handles long-running AI requests

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev                    # Start dev server

# Database
npm run db:push                # Push schema to database
npm run db:generate            # Generate migrations
npm run db:studio              # Open Drizzle Studio (GUI)
npm run seed                   # Seed knowledge base

# Production
npm run build                  # Build for production
npm run start                  # Start production server
```

---

## 📊 Managing Knowledge Base

### Option 1: Manual SQL (via Drizzle Studio)
```bash
npm run db:studio
```
Opens a GUI at `https://local.drizzle.studio`

### Option 2: Programmatically
Edit `scripts/seed.ts` and add your custom knowledge:
```typescript
const myKnowledge = [
  {
    category: 'products',
    title: 'iPhone 15',
    content: 'Latest iPhone with A17 chip, starting at $799',
  },
  // Add more...
];
```

Then run:
```bash
npm run seed
```

---

## 🚀 Deployment (Vercel)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
4. Deploy! ✨

Vercel automatically detects Workflow usage and enables it.

---

## 🔜 Coming Next

- [ ] WhatsApp Business API integration
- [ ] WhatsApp webhook handlers
- [ ] 24-hour window tracking
- [ ] Message templates for business-initiated conversations
- [ ] Admin dashboard for knowledge base management

---

## 📝 License

MIT

---

## 🤝 Contributing

Contributions welcome! Open an issue or submit a PR.
