"use client";

import type React from "react";

import { useState, useRef, useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Mail,
  User,
  Bot,
  Minimize2,
  Maximize2,
  Calendar,
  AlertCircle,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { ChatKnowledgeIndicator } from "./chat-knowledge-indicator";

// Counter for generating stable IDs
let messageCounter = 0;

// Function to generate stable IDs that are consistent between server and client
const generateStableId = () => {
  messageCounter += 1;
  return `msg-${messageCounter}`;
};

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot" | "agent";
  timestamp: Date;
  type?: "text" | "quick-reply" | "error";
  options?: string[];
  suggestedActions?: string[];
  knowledgeSources?: Array<{
    title: string;
    category: string;
    similarity: number;
    id: string;
  }>;
  agentInfo?: {
    name: string;
    avatar: string;
    status: "online" | "busy" | "offline";
  };
}

interface QuickReply {
  text: string;
  action: string;
}

export function ChatWidget() {
  const idPrefix = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatMode, setChatMode] = useState<"bot" | "agent">("bot");
  const [unreadCount, setUnreadCount] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use AI SDK's useChat hook
  const {
    messages: aiMessages,
    input,
    handleInputChange,
    handleSubmit: handleAISubmit,
    isLoading,
    error,
    setMessages: setAIMessages,
  } = useChat({
    api: "/api/chat",
    body: {
      conversationHistory: conversationHistory,
    },
    onFinish: (message) => {
      // Add AI response to conversation history with knowledge sources
      const aiMessage: Message = {
        id: `${idPrefix}-bot-${generateStableId()}`,
        content: message.content,
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        // Extract knowledge sources from response metadata if available
        knowledgeSources: extractKnowledgeSources(message.content),
      };
      setConversationHistory((prev) => [...prev, aiMessage]);
    },
    onError: (error) => {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: `${idPrefix}-error-${generateStableId()}`,
        content:
          "Xin lỗi, tôi đang gặp vấn đề kỹ thuật. Bạn có thể liên hệ hotline 1900 1234 để được hỗ trợ ngay không?",
        sender: "bot",
        timestamp: new Date(),
        type: "error",
        suggestedActions: ["Liên hệ sales", "Gọi hotline", "Gửi email"],
      };
      setConversationHistory((prev) => [...prev, errorMessage]);
    },
  });

  const quickReplies: QuickReply[] = [
    { text: "Tư vấn sản phẩm ERP", action: "product_erp" },
    { text: "Báo giá dự án", action: "project_quote" },
    { text: "Hỗ trợ kỹ thuật", action: "technical_support" },
    { text: "Đặt lịch hẹn", action: "book_appointment" },
    { text: "Liên hệ sales", action: "contact_sales" },
    { text: "Thông tin công ty", action: "company_info" },
  ];

  // Extract knowledge sources from AI response (mock implementation)
  const extractKnowledgeSources = (content: string) => {
    // This would be enhanced to parse actual knowledge source metadata from the AI response
    const sources = [];

    if (content.includes("ERP") || content.includes("quản lý doanh nghiệp")) {
      sources.push({
        title: "Katec ERP - Hệ thống quản lý doanh nghiệp",
        category: "product",
        similarity: 0.95,
        id: "erp-product",
      });
    }

    if (content.includes("CRM") || content.includes("khách hàng")) {
      sources.push({
        title: "CRM 360° - Nền tảng quản lý khách hàng",
        category: "product",
        similarity: 0.92,
        id: "crm-product",
      });
    }

    if (content.includes("AI") || content.includes("phân tích")) {
      sources.push({
        title: "AI Analytics Pro - Nền tảng phân tích dữ liệu",
        category: "product",
        similarity: 0.88,
        id: "ai-analytics",
      });
    }

    if (
      content.includes("giá") ||
      content.includes("chi phí") ||
      content.includes("thanh toán")
    ) {
      sources.push({
        title: "Chính sách giá và thanh toán",
        category: "policy",
        similarity: 0.85,
        id: "pricing-policy",
      });
    }

    return sources;
  };

  useEffect(() => {
    if (isOpen && conversationHistory.length === 0) {
      // Initial greeting with quick replies
      setTimeout(() => {
        const greetingMessage: Message = {
          id: `${idPrefix}-greeting-${generateStableId()}`,
          content:
            "Xin chào! Tôi là TechBot, trợ lý AI của Katec được hỗ trợ bởi Knowledge Base toàn diện. Tôi có thể cung cấp thông tin chính xác về sản phẩm, dịch vụ và chính sách của chúng tôi. Bạn quan tâm đến điều gì?",
          sender: "bot",
          timestamp: new Date(),
          type: "quick-reply",
          options: quickReplies.map((q) => q.text),
        };
        setConversationHistory([greetingMessage]);
      }, 500);
    }
  }, [isOpen, idPrefix]);

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory, aiMessages]);

  useEffect(() => {
    if (!isOpen && (conversationHistory.length > 0 || aiMessages.length > 0)) {
      const lastMessage =
        conversationHistory[conversationHistory.length - 1] ||
        aiMessages[aiMessages.length - 1];
      if (lastMessage && lastMessage.sender !== "user") {
        setUnreadCount((prev) => prev + 1);
      }
    }
  }, [conversationHistory, aiMessages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to conversation history
    const userMessage: Message = {
      id: `${idPrefix}-user-${generateStableId()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setConversationHistory((prev) => [...prev, userMessage]);

    // Use AI SDK's handler to send message
    handleAISubmit(e);

    setUnreadCount(0);
  };

  const handleQuickReply = async (option: string) => {
    const action =
      quickReplies.find((q) => q.text === option)?.action || "default";

    // Add user message
    const userMessage: Message = {
      id: `${idPrefix}-user-${generateStableId()}`,
      content: option,
      sender: "user",
      timestamp: new Date(),
    };
    setConversationHistory((prev) => [...prev, userMessage]);

    // Handle special actions
    if (action === "contact_sales" || action === "technical_support") {
      setChatMode("agent");
      const agentMessage: Message = {
        id: `${idPrefix}-agent-${generateStableId()}`,
        content:
          "Tôi đang kết nối bạn với chuyên viên tư vấn. Vui lòng chờ trong giây lát...",
        sender: "bot",
        timestamp: new Date(),
      };
      setConversationHistory((prev) => [...prev, agentMessage]);

      // Simulate agent connection
      setTimeout(() => {
        const agentWelcome: Message = {
          id: `${idPrefix}-agent-welcome-${generateStableId()}`,
          content:
            "Xin chào! Tôi là Nguyễn Văn A, chuyên viên tư vấn của Katec. Tôi có thể giúp gì cho bạn?",
          sender: "agent",
          timestamp: new Date(),
          agentInfo: {
            name: "Nguyễn Văn A",
            avatar:
              "/placeholder.svg?height=32&width=32&query=customer service agent",
            status: "online",
          },
        };
        setConversationHistory((prev) => [...prev, agentWelcome]);
      }, 2000);
    } else {
      // Send to API for processing
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: option,
            conversationHistory: conversationHistory,
          }),
        });

        if (response.ok) {
          const contentType = response.headers.get("content-type");

          if (contentType?.includes("application/json")) {
            // Handle JSON response (fallback mode)
            const data = await response.json();
            const botMessage: Message = {
              id: `${idPrefix}-bot-${generateStableId()}`,
              content: data.response,
              sender: "bot",
              timestamp: new Date(),
              knowledgeSources: data.knowledgeSources || [],
              suggestedActions: data.suggestedActions,
            };
            setConversationHistory((prev) => [...prev, botMessage]);
          } else {
            // Handle streaming response (AI mode)
            const reader = response.body?.getReader();
            let aiResponse = "";

            if (reader) {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = new TextDecoder().decode(value);
                const lines = chunk.split("\n");

                for (const line of lines) {
                  if (line.startsWith("0:")) {
                    try {
                      const data = JSON.parse(line.slice(2));
                      if (data.content) {
                        aiResponse += data.content;
                      }
                    } catch (e) {
                      // Ignore parsing errors
                    }
                  }
                }
              }

              if (aiResponse) {
                const botMessage: Message = {
                  id: `${idPrefix}-bot-${generateStableId()}`,
                  content: aiResponse,
                  sender: "bot",
                  timestamp: new Date(),
                  knowledgeSources: extractKnowledgeSources(aiResponse),
                };
                setConversationHistory((prev) => [...prev, botMessage]);
              }
            }
          }
        }
      } catch (error) {
        console.error("Quick reply error:", error);
        const errorMessage: Message = {
          id: `${idPrefix}-error-${generateStableId()}`,
          content:
            "Xin lỗi, có lỗi xảy ra. Bạn có thể thử lại hoặc liên hệ hotline 1900 1234.",
          sender: "bot",
          timestamp: new Date(),
          type: "error",
        };
        setConversationHistory((prev) => [...prev, errorMessage]);
      }
    }
  };

  const handleSuggestedAction = (action: string) => {
    switch (action) {
      case "Liên hệ sales":
        setChatMode("agent");
        break;
      case "Gọi hotline":
        window.open("tel:19001234");
        break;
      case "Gửi email":
        window.open("mailto:info@Katec.com");
        break;
      default:
        handleQuickReply(action);
    }
  };

  const handleKnowledgeSourceClick = async (sourceId: string) => {
    try {
      const response = await fetch(`/api/knowledge-base/${sourceId}`);
      const data = await response.json();

      if (data.document) {
        // Show document details in a modal or new message
        const sourceMessage: Message = {
          id: `${idPrefix}-source-${generateStableId()}`,
          content: `📄 **${
            data.document.title
          }**\n\n${data.document.content.substring(0, 800)}${
            data.document.content.length > 800 ? "..." : ""
          }`,
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        };
        setConversationHistory((prev) => [...prev, sourceMessage]);
      }
    } catch (error) {
      console.error("Failed to load knowledge source:", error);
    }
  };

  const handleKnowledgeFeedback = (helpful: boolean) => {
    // Track knowledge base feedback
    console.log("Knowledge feedback:", helpful);
    // You could send this to analytics
  };

  const openChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Combine conversation history with AI messages for display
  const allMessages = [
    ...conversationHistory,
    ...aiMessages
      .filter((msg) => msg.role === "user")
      .map((msg) => ({
        id: msg.id,
        content: msg.content,
        sender: "user" as const,
        timestamp: new Date(),
      })),
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openChat}
          className="relative h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-6 w-6 text-white" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>

        {/* Enhanced Tooltip */}
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>AI hỗ trợ bởi Knowledge Base!</span>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={cn(
          "w-80 md:w-96 shadow-2xl transition-all duration-300",
          isMinimized ? "h-14" : "h-[500px]"
        )}
      >
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32&query=Katec AI bot with database" />
              <AvatarFallback>KB</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm font-medium flex items-center">
                {chatMode === "bot" ? "TechBot AI" : "Chuyên viên tư vấn"}
                {chatMode === "bot" && <Database className="h-3 w-3 ml-1" />}
              </CardTitle>
              <div className="flex items-center space-x-1 text-xs opacity-90">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>
                  {isLoading ? "Đang trả lời..." : "Knowledge Base ready"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMinimize}
              className="text-white hover:bg-white/20"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeChat}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 p-0 h-80 overflow-y-auto">
              <div className="p-4 space-y-4">
                {allMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3 text-sm",
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : message.type === "error"
                          ? "bg-red-50 text-red-900 border border-red-200"
                          : "bg-gray-100 text-gray-900 border"
                      )}
                    >
                      {message.sender !== "user" && (
                        <div className="flex items-center space-x-2 mb-2">
                          {message.type === "error" ? (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          ) : message.sender === "bot" ? (
                            <div className="flex items-center">
                              <Bot className="h-4 w-4 text-blue-600" />
                              {message.knowledgeSources &&
                                message.knowledgeSources.length > 0 && (
                                  <Database className="h-3 w-3 ml-1 text-green-600" />
                                )}
                            </div>
                          ) : (
                            <User className="h-4 w-4 text-green-600" />
                          )}
                          <span className="text-xs font-medium">
                            {message.sender === "bot"
                              ? "TechBot AI"
                              : message.agentInfo?.name || "Chuyên viên"}
                          </span>
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>

                      {/* Knowledge Sources Indicator */}
                      {message.knowledgeSources &&
                        message.knowledgeSources.length > 0 && (
                          <ChatKnowledgeIndicator
                            sources={message.knowledgeSources}
                            onSourceClick={handleKnowledgeSourceClick}
                            onFeedback={handleKnowledgeFeedback}
                          />
                        )}

                      {/* Quick Reply Options */}
                      {message.type === "quick-reply" && message.options && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="w-full text-left justify-start text-xs hover:bg-blue-50"
                              onClick={() => handleQuickReply(option)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Suggested Actions for Errors */}
                      {message.suggestedActions && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium">Bạn có thể:</p>
                          {message.suggestedActions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="w-full text-left justify-start text-xs"
                              onClick={() => handleSuggestedAction(action)}
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      )}

                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 text-sm border">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        <Database className="h-3 w-3 text-green-600 animate-pulse" />
                        <span className="text-xs font-medium">TechBot AI</span>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Đang tìm kiếm trong Knowledge Base...
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex justify-start">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-xs font-medium text-red-900">
                          Lỗi kết nối
                        </span>
                      </div>
                      <p className="text-red-800">
                        Không thể kết nối với AI. Vui lòng thử lại sau.
                      </p>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Quick Actions */}
            <div className="border-t p-3">
              <div className="flex space-x-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => window.open("tel:19001234")}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Gọi
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => window.open("mailto:info@Katec.com")}
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => handleQuickReply("Đặt lịch hẹn")}
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  Hẹn
                </Button>
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 text-sm"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
