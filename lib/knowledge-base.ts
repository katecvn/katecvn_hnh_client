export interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  metadata: {
    lastUpdated: Date;
    source: string;
    priority: number;
  };
}

export interface SearchResult {
  document: KnowledgeDocument;
  similarity: number;
  relevantChunk: string;
}

function chunkText(text: string, maxLength = 500): string[] {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const chunks: string[] = [];
  let currentChunk = '';
  for (const sentence of sentences) {
    if (
      (currentChunk + sentence).length > maxLength &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? '. ' : '') + sentence;
    }
  }
  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  return chunks;
}

class KnowledgeBaseManager {
  private documents: KnowledgeDocument[] = [];

  constructor() {}

  addDocument(doc: KnowledgeDocument) {
    this.documents.push(doc);
  }

  getDocumentsByCategory(category: string): KnowledgeDocument[] {
    return this.documents.filter((doc) => doc.category === category);
  }

  getAllCategories(): string[] {
    return [...new Set(this.documents.map((doc) => doc.category))];
  }

  getStats() {
    return {
      totalDocuments: this.documents.length,
      categories: this.getAllCategories().length,
      documentsWithEmbeddings: 0,
      embeddingEnabled: false,
      lastUpdated: new Date(),
    };
  }

  searchRelevantDocuments(query: string, limit = 3): SearchResult[] {
    const queryLower = query.toLowerCase();
    const keywords = queryLower.split(' ').filter((word) => word.length > 2);

    const results: SearchResult[] = [];

    for (const doc of this.documents) {
      let score = 0;
      const contentLower = doc.content.toLowerCase();
      const titleLower = doc.title.toLowerCase();

      for (const keyword of keywords) {
        if (titleLower.includes(keyword)) score += 3;
        if (doc.tags.some((tag) => tag.toLowerCase().includes(keyword)))
          score += 2;
        if (contentLower.includes(keyword)) score += 1;
      }

      if (score > 0) {
        const chunks = chunkText(doc.content);
        let bestChunk = chunks[0] || doc.content;
        let bestScore = 0;

        for (const chunk of chunks) {
          const chunkLower = chunk.toLowerCase();
          let chunkScore = 0;
          for (const keyword of keywords) {
            if (chunkLower.includes(keyword)) chunkScore++;
          }
          if (chunkScore > bestScore) {
            bestScore = chunkScore;
            bestChunk = chunk;
          }
        }

        results.push({
          document: doc,
          similarity: score / (keywords.length * 3),
          relevantChunk: bestChunk,
        });
      }
    }

    return results.sort((a, b) => b.similarity - a.similarity).slice(0, limit);
  }
}

export const knowledgeBaseManager = new KnowledgeBaseManager();
