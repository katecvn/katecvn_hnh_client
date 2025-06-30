import { type NextRequest, NextResponse } from 'next/server';
import {
  knowledgeBaseManager,
  type KnowledgeDocument,
} from '@/lib/knowledge-base';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = Number.parseInt(searchParams.get('limit') || '10');

    if (query) {
      // Search documents
      const results = await knowledgeBaseManager.searchRelevantDocuments(
        query,
        limit
      );
      return NextResponse.json({
        query,
        results: results.map((r) => ({
          document: {
            id: r.document.id,
            title: r.document.title,
            category: r.document.category,
            tags: r.document.tags,
            metadata: r.document.metadata,
          },
          similarity: r.similarity,
          relevantChunk: r.relevantChunk,
        })),
        total: results.length,
      });
    }

    if (category) {
      // Get documents by category
      const documents = knowledgeBaseManager.getDocumentsByCategory(category);
      return NextResponse.json({
        category,
        documents: documents.map((doc) => ({
          id: doc.id,
          title: doc.title,
          category: doc.category,
          tags: doc.tags,
          metadata: doc.metadata,
        })),
        total: documents.length,
      });
    }

    // Get all categories and stats
    const stats = knowledgeBaseManager.getStats();
    const categories = knowledgeBaseManager.getAllCategories();

    return NextResponse.json({
      stats,
      categories,
      message:
        'Knowledge Base API - Use ?q=query to search or ?category=name to filter',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process knowledge base request' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const document: KnowledgeDocument = await request.json();

    // Validate required fields
    if (
      !document.id ||
      !document.title ||
      !document.content ||
      !document.category
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: id, title, content, category' },
        { status: 400 }
      );
    }

    // Add document to knowledge base
    await knowledgeBaseManager.addDocument(document);

    return NextResponse.json({
      success: true,
      message: `Document "${document.title}" added successfully`,
      document: {
        id: document.id,
        title: document.title,
        category: document.category,
        tags: document.tags,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add document to knowledge base' },
      { status: 500 }
    );
  }
}
