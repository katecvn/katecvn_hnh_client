import { type NextRequest, NextResponse } from "next/server"
import { knowledgeBaseManager } from "@/lib/knowledge-base"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const document = knowledgeBaseManager.getDocumentById(params.id)

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    return NextResponse.json({
      document: {
        id: document.id,
        title: document.title,
        content: document.content,
        category: document.category,
        tags: document.tags,
        metadata: document.metadata,
      },
    })
  } catch (error) {
    console.error("Failed to get document:", error)
    return NextResponse.json({ error: "Failed to retrieve document" }, { status: 500 })
  }
}
