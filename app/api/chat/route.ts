import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import type { NextRequest } from "next/server";
import { knowledgeBaseManager } from "@/lib/knowledge-base";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Initialize knowledge base on startup
let isInitialized = false;

async function initializeKnowledgeBase() {
  if (!isInitialized) {
    try {
      await knowledgeBaseManager.initializeEmbeddings();
      isInitialized = true;
    } catch (error) {
      console.error("Knowledge base initialization failed:", error);
      // Continue without embeddings - keyword search will be used
      isInitialized = true;
    }
  }
}

// Check if OpenAI API is available
function isOpenAIAvailable(): boolean {
  return !!(
    process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY
  );
}

const SYSTEM_PROMPT = `Bạn là KatecBot, trợ lý AI chuyên nghiệp của Katec - công ty công nghệ thông tin hàng đầu Việt Nam.

HƯỚNG DẪN SỬ DỤNG KNOWLEDGE BASE:
- Bạn sẽ được cung cấp thông tin từ knowledge base để trả lời chính xác
- Luôn ưu tiên thông tin từ knowledge base hơn kiến thức general
- Nếu không tìm thấy thông tin trong knowledge base, hãy thành thật nói và đề xuất liên hệ chuyên viên
- Trích dẫn thông tin cụ thể từ knowledge base khi có thể

CÁCH TRẢ LỜI:
- Thân thiện, chuyên nghiệp và hữu ích
- Trả lời bằng tiếng Việt tự nhiên
- Cung cấp thông tin cụ thể và chi tiết
- Đề xuất hành động tiếp theo phù hợp
- Luôn kết thúc bằng câu hỏi để duy trì cuộc trò chuyện

THÔNG TIN LIÊN HỆ NHANH:
- Hotline: 1900 1234
- Email: info@Katec.com
- Website: https://Katec.com

Hãy sử dụng knowledge base được cung cấp để trả lời chính xác và hữu ích nhất!`;

export async function POST(request: NextRequest) {
  try {
    await initializeKnowledgeBase();

    const { message, conversationHistory = [] } = await request.json();

    // Search relevant documents from knowledge base
    const relevantDocs = await knowledgeBaseManager.searchRelevantDocuments(
      message,
      3
    );

    // Build context from relevant documents
    let contextInfo = "";
    if (relevantDocs.length > 0) {
      contextInfo = "\n\nTHÔNG TIN TỪ KNOWLEDGE BASE:\n";
      relevantDocs.forEach((result, index) => {
        contextInfo += `\n${index + 1}. ${
          result.document.title
        } (Độ liên quan: ${(result.similarity * 100).toFixed(1)}%)\n`;
        contextInfo += `${result.relevantChunk}\n`;
        if (result.document.tags.length > 0) {
          contextInfo += `Tags: ${result.document.tags.join(", ")}\n`;
        }
        contextInfo += "---\n";
      });
    }

    // Check if OpenAI is available
    if (!isOpenAIAvailable()) {
      // Return knowledge base response without AI processing
      if (relevantDocs.length > 0) {
        const bestMatch = relevantDocs[0];
        const response = `Dựa trên thông tin từ knowledge base về "${
          bestMatch.document.title
        }":

${bestMatch.relevantChunk}

${
  bestMatch.document.category === "product"
    ? "Để biết thêm chi tiết về sản phẩm này, "
    : ""
}${
          bestMatch.document.category === "service"
            ? "Để tìm hiểu thêm về dịch vụ này, "
            : ""
        }bạn có thể liên hệ:
- Hotline: 1900 1234
- Email: info@Katec.com

Bạn có câu hỏi gì khác không?`;

        return new Response(
          JSON.stringify({
            response,
            source: "knowledge-base-only",
            knowledgeSources: relevantDocs.map((doc) => ({
              title: doc.document.title,
              category: doc.document.category,
              similarity: doc.similarity,
              id: doc.document.id,
            })),
            suggestedActions: [
              "Liên hệ sales",
              "Xem thêm sản phẩm",
              "Đặt lịch tư vấn",
            ],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        // No relevant docs found and no AI available
        const fallbackResponse = `Xin lỗi, tôi không tìm thấy thông tin cụ thể về "${message}" trong knowledge base của chúng tôi.

Để được hỗ trợ tốt nhất, bạn có thể:
- Gọi hotline: 1900 1234
- Email: info@Katec.com
- Hoặc thử hỏi về các chủ đề khác như: sản phẩm ERP, CRM, dịch vụ phát triển phần mềm

Bạn có muốn tìm hiểu về sản phẩm hoặc dịch vụ nào cụ thể không?`;

        return new Response(
          JSON.stringify({
            response: fallbackResponse,
            source: "fallback-no-ai",
            suggestedActions: [
              "Sản phẩm ERP",
              "Dịch vụ CRM",
              "Phát triển phần mềm",
              "Liên hệ sales",
            ],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Build messages array for OpenAI
    const messages = [
      {
        role: "system",
        content: SYSTEM_PROMPT + contextInfo,
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages,
      temperature: 0.3, // Lower temperature for more factual responses
      maxTokens: 800,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    // Enhanced fallback with knowledge base search
    try {
      const { message } = await request.json();
      const relevantDocs = await knowledgeBaseManager.searchRelevantDocuments(
        message,
        1
      );

      if (relevantDocs.length > 0) {
        const doc = relevantDocs[0];
        const fallbackResponse = `Dựa trên thông tin từ knowledge base về "${doc.document.title}":

${doc.relevantChunk}

Để biết thêm chi tiết, bạn có thể liên hệ:
- Hotline: 1900 1234
- Email: info@Katec.com

Bạn có câu hỏi gì khác về ${doc.document.category} không?`;

        return new Response(
          JSON.stringify({
            response: fallbackResponse,
            source: "knowledge-base-fallback",
            suggestedActions: [
              "Liên hệ sales",
              "Xem thêm sản phẩm",
              "Đặt lịch tư vấn",
            ],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } catch (kbError) {
      console.error("Knowledge base fallback error:", kbError);
    }

    // Final fallback
    const fallbackResponses = [
      "Xin lỗi, tôi đang gặp chút vấn đề kỹ thuật. Bạn có thể liên hệ hotline 1900 1234 để được hỗ trợ ngay lập tức không?",
      "Hệ thống đang bảo trì, vui lòng thử lại sau ít phút hoặc liên hệ email info@Katec.com",
      "Tôi không thể xử lý yêu cầu lúc này. Bạn có muốn tôi kết nối với chuyên viên tư vấn không?",
    ];

    const fallbackResponse =
      fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    return new Response(
      JSON.stringify({
        response: fallbackResponse,
        error: true,
        suggestedActions: ["Liên hệ sales", "Gọi hotline", "Gửi email"],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
