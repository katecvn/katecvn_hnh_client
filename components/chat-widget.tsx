// ChatWidget.tsx - Phiên bản không dùng useChat từ ai/react

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatKnowledgeIndicator } from './chat-knowledge-indicator';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'error';
  knowledgeSources?: Array<{
    title: string;
    category: string;
    similarity: number;
    id: string;
  }>;
  suggestedActions?: string[];
}

let messageCounter = 0;
const generateId = () => `msg-${++messageCounter}`;

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && conversation.length === 0) {
      const greeting: Message = {
        id: generateId(),
        content:
          'Xin chào! Tôi là KatecBot, trợ lý AI của Katec. Bạn cần hỗ trợ gì?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'quick-reply',
      };
      setConversation([greeting]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: generateId(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setConversation((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationHistory: conversation,
        }),
      });

      if (!res.ok) throw new Error('Lỗi server');

      const data = await res.json();

      const botMsg: Message = {
        id: generateId(),
        content: data.response || '...',
        sender: 'bot',
        timestamp: new Date(),
        knowledgeSources: data.knowledgeSources || [],
        suggestedActions: data.suggestedActions || [],
      };
      setConversation((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setError('Không thể kết nối đến máy chủ');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://m.me/1016769568527370"
          target="_blank"
          rel="noopener noreferrer"
          className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 md:w-96 h-[500px] flex flex-col">
        <CardHeader className="bg-blue-600 text-white flex justify-between items-center">
          <CardTitle className="text-sm">TechBot AI</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 /> : <Minimize2 />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X />
            </Button>
          </div>
        </CardHeader>
        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`text-sm ${
                    msg.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block px-3 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : msg.type === 'error'
                        ? 'bg-red-100 text-red-900'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {error && <div className="text-red-600 text-sm">{error}</div>}
              {isLoading && (
                <div className="text-xs text-gray-400">Đang trả lời...</div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
            <div className="border-t p-3">
              <form onSubmit={handleSend} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  disabled={isLoading}
                />
                <Button type="submit" disabled={!input.trim() || isLoading}>
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
