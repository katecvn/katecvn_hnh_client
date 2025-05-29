"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Database, ExternalLink, ThumbsUp, ThumbsDown } from "lucide-react"

interface KnowledgeSource {
  title: string
  category: string
  similarity: number
  id: string
}

interface ChatKnowledgeIndicatorProps {
  sources?: KnowledgeSource[]
  onSourceClick?: (sourceId: string) => void
  onFeedback?: (helpful: boolean) => void
}

export function ChatKnowledgeIndicator({ sources = [], onSourceClick, onFeedback }: ChatKnowledgeIndicatorProps) {
  if (sources.length === 0) return null

  return (
    <Card className="mt-3 bg-blue-50 border-blue-200">
      <CardContent className="p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Database className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Thông tin từ Knowledge Base</span>
        </div>

        <div className="space-y-2">
          {sources.map((source, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {source.category}
                </Badge>
                <span className="text-sm text-gray-700">{source.title}</span>
                <Badge variant="secondary" className="text-xs">
                  {(source.similarity * 100).toFixed(0)}%
                </Badge>
              </div>
              {onSourceClick && (
                <Button variant="ghost" size="sm" onClick={() => onSourceClick(source.id)} className="h-6 w-6 p-0">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {onFeedback && (
          <div className="flex items-center justify-center space-x-2 mt-3 pt-2 border-t border-blue-200">
            <span className="text-xs text-gray-600">Thông tin này có hữu ích không?</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFeedback(true)}
              className="h-6 w-6 p-0 hover:bg-green-100"
            >
              <ThumbsUp className="h-3 w-3 text-green-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFeedback(false)}
              className="h-6 w-6 p-0 hover:bg-red-100"
            >
              <ThumbsDown className="h-3 w-3 text-red-600" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
