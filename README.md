# Katec - Knowledge Base RAG System

## Environment Setup

### Required Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`bash

# OpenAI API Key (optional - system works without it)

OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### Features

#### With OpenAI API Key:

- ✅ Vector embeddings for semantic search
- ✅ AI-powered responses with context
- ✅ High accuracy knowledge retrieval
- ✅ Streaming responses

#### Without OpenAI API Key (Fallback Mode):

- ✅ Keyword-based search
- ✅ Knowledge base responses
- ✅ All basic functionality
- ✅ No external dependencies

## Knowledge Base System

### Architecture

- **10 comprehensive documents** covering company, products, services
- **Dual search modes**: Vector embeddings + keyword fallback
- **Smart chunking** for relevant content extraction
- **Source attribution** for transparency
- **Real-time updates** via admin panel

### API Endpoints

- `GET /api/knowledge-base` - Search and browse
- `POST /api/knowledge-base` - Add documents
- `GET /api/knowledge-base/[id]` - Get specific document

### Admin Panel

Access at `/admin/knowledge-base` for:

- Document management
- Search testing
- Performance monitoring
- Content updates

## Deployment

The system is designed to work in multiple environments:

1. **Full AI Mode** (with OpenAI API key)
2. **Knowledge Base Only** (without API key)
3. **Hybrid Mode** (graceful degradation)

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the website with integrated chatbot.

## Chatbot Features

- 🤖 AI-powered responses with knowledge base context
- 📚 Comprehensive company knowledge
- 🔍 Smart search with relevance scoring
- 💬 Natural conversation flow
- 📱 Mobile-responsive design
- 🛠️ Admin management tools
